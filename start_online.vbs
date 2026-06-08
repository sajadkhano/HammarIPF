Set WshShell = CreateObject("WScript.Shell")
Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")

' Delete old log if exists
If fso.FileExists("cloudflared.log") Then
    fso.DeleteFile "cloudflared.log", True
End If

' Start Python server hidden
WshShell.Run "cmd /c start /b python -m http.server 8089", 0, False

' Start Cloudflared hidden and redirect to log
WshShell.Run "cmd /c .\cloudflared.exe tunnel --url http://localhost:8089 2> cloudflared.log", 0, False

' Wait for the log file to be created and contain the URL
WScript.Sleep 3000

url = ""
For i = 1 To 15
    If fso.FileExists("cloudflared.log") Then
        On Error Resume Next
        Set file = fso.OpenTextFile("cloudflared.log", 1)
        If Err.Number = 0 Then
            content = file.ReadAll()
            file.Close
            
            ' Find trycloudflare.com
            startPos = InStr(content, "https://")
            If startPos > 0 Then
                endPos = InStr(startPos, content, ".trycloudflare.com")
                If endPos > 0 Then
                    url = Mid(content, startPos, endPos - startPos + 18)
                    Exit For
                End If
            End If
        End If
        On Error GoTo 0
    End If
    WScript.Sleep 2000
Next

If url <> "" Then
    ' Open in default browser
    WshShell.Run url
    ' Copy to clipboard (requires IE or HTMLFile trick, but simple MsgBox is safer)
    MsgBox "تم تشغيل النظام بنجاح! السيرفر يعمل الآن في الخلفية." & vbCrLf & vbCrLf & "رابط المشاركة الخاص بك هو:" & vbCrLf & url & vbCrLf & vbCrLf & "تم فتح الرابط في متصفحك. انسخ الرابط من المتصفح وشاركه مع أصدقائك.", 64, "Hammar IPF Online"
Else
    MsgBox "تأخر الاتصال بالسيرفر أو حدث خطأ. يرجى التأكد من اتصال الإنترنت.", 16, "خطأ"
End If
