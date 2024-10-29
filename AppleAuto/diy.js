        document.querySelectorAll('.password').forEach(button => {
            button.addEventListener('click', (event) => {
                const buttonId = event.target.id; // 获取按钮 ID
                showFirstPopup(buttonId); // 启动弹窗并传递按钮 ID
            });
        });

        // 第一个弹窗
        function showFirstPopup(buttonId) {
            Swal.fire({
                title: '新手登录问题选择1',
                html: `<p>共享账号在哪里登录是安全的？</p><br>
                    <div class="button-container">
             <img src="https://cdn.jsdelivr.net/gh/usaxhj/usaxhj.github.io/AppleAuto/01a.png" id="correctButton1" alt="正确链接图片">
             <img src="https://cdn.jsdelivr.net/gh/usaxhj/usaxhj.github.io/AppleAuto/01b.png" id="wrongButton1" alt="错误链接图片">
                    </div>
                `,
                showCancelButton: false,
                showConfirmButton: false
            });

            document.getElementById('correctButton1').addEventListener('click', () => {
                Swal.close(); // 关闭第一个弹窗
                showSecondPopup(buttonId); // 传递按钮 ID 打开第二个弹窗
            });

            document.getElementById('wrongButton1').addEventListener('click', () => {
                Swal.fire('安全警告！', '共享账号不要在设置中登录！<br>只能在AppStore商店中登录！', 'error');
            });
        }

        // 第二个弹窗
        function showSecondPopup(buttonId) {
            Swal.fire({
                title: '新手登录问题选择2',
                html: `<p>登录账号时弹出AppleID安全提示，点什么？</p>
                    <img src="https://cdn.jsdelivr.net/gh/usaxhj/usaxhj.github.io/AppleAuto/02.png" width="99%"> <br>  
                    <p id="wrongButton2">继续</p>
                    <p id="correctButton2">其他选项</p>`,
                showCancelButton: false,
                showConfirmButton: false
            });

            document.getElementById('correctButton2').addEventListener('click', () => {
                Swal.close();
                showThirdPopup(buttonId); // 传递按钮 ID 打开第三个弹窗
            });

            document.getElementById('wrongButton2').addEventListener('click', () => {
                Swal.fire('回答错误', '点继续会泄露个人隐私并收到垃圾短信！', 'error');
            });
        }

        // 第三个弹窗
        function showThirdPopup(buttonId) {
            Swal.fire({
                title: '新手登录问题选择3',
                html: `<p>点击其他选项后，第二步再点什么？</p><img src="https://cdn.jsdelivr.net/gh/usaxhj/usaxhj.github.io/AppleAuto/03.jpg" width="99%"><br><br>
                       请输入<span style="color: #e03e2d;"> 升级账户安全 </span>或<span style="color: #e03e2d;"> 不升级</span>`,
                input: 'text',
                inputPlaceholder: "请输入你的答案",
                showCancelButton: true,
                confirmButtonText: '提交',
                cancelButtonText: '取消',
                preConfirm: (value) => {
                    const userInput = value.trim();
                    const correctAnswer = "不升级";

                    if (!userInput) {
                        Swal.showValidationMessage('回答不能为空');
                        return false;
                    } else if (userInput !== correctAnswer) {
                        Swal.showValidationMessage('回答错误，请重新输入正确的答案。');
                        return false;
                    } else {
                        return userInput;
                    }
                }
            }).then((result) => {
        if (result.isConfirmed) {
            // 验证通过，执行复制操作
            copyToClipboard(buttonId);
            Swal.fire('验证成功', '密码已复制到剪贴板！', 'success');
        } else {
            Swal.fire('已取消', '您取消了操作。', 'info');
        }
    });
}

// 复制文本功能
function copyToClipboard(buttonId) {
    const button = document.getElementById(buttonId);
    const textToCopy = button.getAttribute('data-clipboard-text');

    const clipboard = new ClipboardJS(`#${buttonId}`, {
        text: () => textToCopy
    });

    // 手动触发点击以复制内容
    button.click();

    // 复制成功后，销毁 clipboard 实例
    clipboard.on('success', () => clipboard.destroy());
    clipboard.on('error', () => {
        Swal.fire('复制失败', '请手动复制密码', 'error');
    });
}
