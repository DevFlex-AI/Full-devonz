import * as vscode from "vscode";

const OUTPUT = vscode.window.createOutputChannel("Devonz Bridge");
let ws: WebSocket | null = null;
let statusBar: vscode.StatusBarItem;
let syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function activate(context: vscode.ExtensionContext) {
  OUTPUT.appendLine("Devonz Bridge activating…");

  // Status bar
  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.text = "$(sync~spin) Devonz";
  statusBar.tooltip = "Devonz Bridge — click to show status";
  statusBar.command = "devonz.showStatus";
  statusBar.show();
  context.subscriptions.push(statusBar);

  // Read connection params from URL or env
  const projectId = getParam("project") ?? vscode.workspace.getConfiguration("devonz").get<string>("projectId");
  const token = getParam("token") ?? vscode.workspace.getConfiguration("devonz").get<string>("sessionToken");
  const apiUrl = vscode.workspace.getConfiguration("devonz").get<string>("apiUrl") ?? "https://api.devonz.ai";

  if (projectId && token) {
    connectBridge(apiUrl, projectId, token);
  } else {
    statusBar.text = "$(warning) Devonz";
    statusBar.tooltip = "Devonz Bridge — not connected (no project/token)";
  }

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand("devonz.syncNow", () => syncAllFiles(projectId, token, apiUrl)),
    vscode.commands.registerCommand("devonz.showStatus", () => {
      const state = ws?.readyState;
      const stateLabel = state === WebSocket.OPEN ? "Connected ✓" : state === WebSocket.CONNECTING ? "Connecting…" : "Disconnected";
      vscode.window.showInformationMessage(`Devonz Bridge: ${stateLabel}${projectId ? ` | Project: ${projectId}` : ""}`);
    }),
    vscode.commands.registerCommand("devonz.openAIChat", () => {
      vscode.commands.executeCommand("devonz.chatView.focus");
    }),
    vscode.commands.registerCommand("devonz.openProject", () => {
      vscode.env.openExternal(vscode.Uri.parse(`https://app.devonz.ai/projects/${projectId}`));
    }),
  );

  // Auto-sync on file save
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      const autoSync = vscode.workspace.getConfiguration("devonz").get<boolean>("autoSync", true);
      if (!autoSync || !projectId || !token) return;
      const debounce = vscode.workspace.getConfiguration("devonz").get<number>("syncDebounceMs", 500);
      if (syncTimeout) clearTimeout(syncTimeout);
      syncTimeout = setTimeout(() => syncFile(doc, projectId, token, apiUrl), debounce);
    })
  );

  OUTPUT.appendLine("Devonz Bridge activated ✓");
}

function getParam(key: string): string | undefined {
  try {
    const url = new URL(window?.location?.href ?? "");
    return url.searchParams.get(key) ?? undefined;
  } catch {
    return undefined;
  }
}

function connectBridge(apiUrl: string, projectId: string, token: string) {
  const wsUrl = `${apiUrl.replace(/^http/, "ws")}/ws/editor?project=${projectId}&token=${token}`;
  try {
    ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      OUTPUT.appendLine("Bridge connected ✓");
      statusBar.text = "$(check) Devonz";
      statusBar.tooltip = "Devonz Bridge — connected";
    };
    ws.onclose = () => {
      OUTPUT.appendLine("Bridge disconnected — retrying in 5s");
      statusBar.text = "$(circle-slash) Devonz";
      setTimeout(() => connectBridge(apiUrl, projectId, token), 5000);
    };
    ws.onerror = (e) => OUTPUT.appendLine(`Bridge error: ${e}`);
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data as string);
        handleIncoming(msg);
      } catch { /* ignore */ }
    };
  } catch (err) {
    OUTPUT.appendLine(`Bridge connection failed: ${err}`);
  }
}

function handleIncoming(msg: { event: string; payload: unknown }) {
  OUTPUT.appendLine(`← ${msg.event}: ${JSON.stringify(msg.payload)}`);
  if (msg.event === "file:changed") {
    const p = msg.payload as { path: string; content: string };
    const uri = vscode.Uri.file(p.path);
    vscode.workspace.fs.writeFile(uri, Buffer.from(p.content, "utf8"));
  }
}

async function syncFile(doc: vscode.TextDocument, projectId: string, token: string, apiUrl: string) {
  if (ws?.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify({
    event: "file:saved",
    payload: { path: doc.uri.fsPath, content: doc.getText(), language: doc.languageId },
    timestamp: Date.now(),
    sessionId: projectId,
  }));
  OUTPUT.appendLine(`↑ Synced: ${doc.uri.fsPath}`);
}

async function syncAllFiles(projectId: string | undefined, token: string | undefined, apiUrl: string) {
  if (!projectId || !token) {
    vscode.window.showWarningMessage("Devonz: Not connected — no project ID or token");
    return;
  }
  const files = await vscode.workspace.findFiles("**/*", "{node_modules,dist,.git}/**", 200);
  let synced = 0;
  await vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: "Devonz: Syncing files…" }, async (progress) => {
    for (const uri of files) {
      try {
        const doc = await vscode.workspace.openTextDocument(uri);
        await syncFile(doc, projectId, token, apiUrl);
        synced++;
        progress.report({ increment: (1 / files.length) * 100, message: `${synced}/${files.length}` });
      } catch { /* binary or unreadable file */ }
    }
  });
  vscode.window.showInformationMessage(`Devonz: Synced ${synced} files ✓`);
}

export function deactivate() {
  ws?.close();
}
