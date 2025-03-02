@echo off
wsl -e bash -c "cd /mnt/d/dev/keystore-inertia && tmux new-session -d -s dev 'cmd.exe /c \"php artisan serve\"' \; split-window -v 'cmd.exe /c \"npm run dev\"' \; attach"