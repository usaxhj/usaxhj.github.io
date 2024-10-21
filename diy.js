document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('myButton').addEventListener('click', () => {
        // 第一个弹窗
            Swal.fire({
                title: '新手登录问题选择1',
                html: `<p>共享账号在哪里登录是安全的？</p>
                    <div class="button-container">
                        <img src="01a.png" id="correctButton1" alt="正确链接图片">
                        <img src="01b.png" id="wrongButton1" alt="错误链接图片">
                    </div>
                `,
                showCancelButton: false,
                showConfirmButton: false
            });

            // 左边链接图片（正确）- 第一个弹窗
            document.getElementById('correctButton1').addEventListener('click', () => {
                Swal.close(); // 关闭第一个弹窗
                showSecondPopup(); // 打开第二个弹窗
            });

            // 右边链接图片（错误）- 第一个弹窗
            document.getElementById('wrongButton1').addEventListener('click', () => {
                Swal.fire('安全警告！<br>', '共享账号不要在设置中登录！<br>为了防止手机被id锁定<br>只能在AppStore商店中登录！', 'error');
            });
        });

        // 第二个弹窗
        function showSecondPopup() {
            Swal.fire({
                title: '新手登录问题选择2',
                html: ` <p>登录账号时弹出AppleID安全提示，点什么？</p><hr>
                   
                    <img src="02.png" width="90%"> <br>  
                    <p id="wrongButton2">继续</p>
                    <p id="correctButton2">其他选项</p>
                    
                `,
                showCancelButton: false,
                showConfirmButton: false
            });

            // 左边链接图片（正确）- 第二个弹窗
            document.getElementById('correctButton2').addEventListener('click', () => {
                Swal.close(); // 关闭第二个弹窗
                showThirdPopup(); // 打开第三个弹窗
            });

            // 右边链接图片（错误）- 第二个弹窗
            document.getElementById('wrongButton2').addEventListener('click', () => {
                Swal.fire('回答错误', '点继续，会绑定你的手机号<br>会泄露个人隐私<br>并收到垃圾短信', 'error');
            });
        }

        // 第三个弹窗
function showThirdPopup() {
    Swal.fire({
        title: '新手登录问题选择3',
        html: `<p>点击其他选项后，第二步再点什么？</p><img src="03.jpg" width="90%"><br>
               请输入<span style="color: #e03e2d;"> 升级账户安全 </span>或<span style="color: #e03e2d;"> 不升级</span>
               `,
        input: 'text', // 添加 input 字段，自动处理回车键
        inputPlaceholder: "请输入你的答案",
        showCancelButton: true, // 显示取消按钮
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        preConfirm: (value) => {
            const userInput = value.trim(); // 获取用户输入并去除空格
            const correctAnswer = "不升级"; // 替换为实际正确答案

            if (!userInput) {
                Swal.showValidationMessage('回答不能为空');
                return false;
            } else if (userInput !== correctAnswer) {
                Swal.showValidationMessage('回答错误，请重新输入正确的答案。');
                return false;
            } else {
                return userInput; // 如果答案正确，返回用户输入
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // 验证成功后处理
            copyToClipboard('您的密码已复制到剪贴板！');
            Swal.fire('验证成功', '密码已复制到剪贴板！', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('已取消', '你已取消新手验证', 'info');
        }
    });
}

    // 复制文本功能
    function copyToClipboard(textToCopy) {
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
});
