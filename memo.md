> wsl --install -d Ubuntu-24.04
// 再起動
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
$ source ~/.bashrc
$ nvm install --lts
$ npm install -g @anthropic-ai/claude-code


> wsl --shutdown
> wsl --unregister Ubuntu-24.04
> wsl --install -d Ubuntu-24.04

$ code --install-extension /home/merlion/.nvm/versions/node/v22.16.0/lib/node_modules/@anthropic-ai/claude-code/vendor/claude-code.vsix
WSLの拡張機能を入れたうえで。。。
$ code .

// VMware Playerの影響で、「仮想マシン プラットフォーム」でPCが激重


 API Error: 401 {"type":"error","error":{"type":"authentication_error","message":"OAuth token has expired. Please obtain a new token or refresh your existing token."}}

 claudeの後に/login


ln -s ~/.nvm/versions/node/v22.16.0/lib/node_modules/@anthropic-ai/claude-code/cli.js ~/.nvm/versions/node/v22.16.0/bin/claude
chmod +x ~/.nvm/versions/node/v22.16.0/lib/node_modules/@anthropic-ai/claude-code/cli.js
