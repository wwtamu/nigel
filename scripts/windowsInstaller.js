const electronInstaller = require('electron-winstaller');

try {
  electronInstaller.createWindowsInstaller({
    appDirectory: 'builds/nigel-win32-ia32',
    outputDirectory: 'builds/nigel-win32-ia32/installer',
    authors: 'William Welling',
    exe: 'nigel.exe'
  });
} catch (e) {
  console.warn(e.message);
}
