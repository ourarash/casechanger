#cordova plugin rm cordova-plugin-console
#cordova build --release android
ionic cordova build android --prod --release
rm *.apk


"c:\Program Files\Java\jdk1.8.0_111\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore signing/my-release-key.jks ".\platforms\android\build\outputs\apk\android-release-unsigned.apk" my-alias

"c:\Users\ourar\AppData\Local\Android\sdk\build-tools\25.0.1\zipalign.exe" -v 4 "platforms\android\build\outputs\apk\android-release-unsigned.apk" CaseChanger.apk
