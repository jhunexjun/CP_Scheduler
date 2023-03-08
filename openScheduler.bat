echo off
set arg1=%1
shift
start "" http://localhost:3000/admin/appointment/%arg1%  %*