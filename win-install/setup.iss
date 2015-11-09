﻿#define MyAppName "Boats Animator"
#define MyAppVersion "0.6.1"
#define MyAppPublisher "Charlie Lee"
#define MyAppURL "https://github.com/BoatsAreRockable/animator"
#define MyAppExeName "Boats Animator.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{1FC75801-F556-47E9-B782-C48EFA74F285}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppName}
LicenseFile=LICENSE.rtf
OutputDir=..\bin\{#MyAppName} {#MyAppVersion}
OutputBaseFilename=Boats-Animator-{#MyAppVersion}-Setup
Compression=lzma2/ultra
SolidCompression=yes
LZMAUseSeparateProcess=yes
; SetupIconFile=icon.ico
WizardImageFile=setupbanner.bmp
WizardSmallImageFile=setuplogosmall.bmp
Uninstallable=yes
UninstallDisplayName={#MyAppName}
UninstallDisplayIcon={app}\{#MyAppExeName}
DisableWelcomePage=yes
DisableProgramGroupPage=yes
AllowNoIcons=yes
ArchitecturesAllowed=x86 x64
ArchitecturesInstallIn64BitMode=x64

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "..\bin\{#MyAppName}\windows-x32\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsWin32
Source: "..\bin\{#MyAppName}\windows-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: IsWin64

[Icons]
Name: "{commonprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Code]                                                                                            
function IsWin32: Boolean;
begin
 Result := not IsWin64;
end;
