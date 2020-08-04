CSA Airpick was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Airpick

A platform for new international students and volunteers, providing free local airport pickup service and temporary lodging service before moving into dorm.

## Project Structure

Airpick's frontend and backend are separated. Frontend uses React.js, backend uses Nodejs. Frontend communicates with backend through RESTful APIs and JSON.

```
|-----client/           #client side
|-----public/           #public resources for frontend
|-----server/           #server side
|-----build/            #built version of frontend app for production
|-----config/           #configs for frontend app
|-----scripts/          #npm scripts, comes with CRA
|-----server.js         #entry of backend service
|-----package.json      #dependency
|-----package-lock.json #dependency with version and integrity checking
|-----Dockerfile        #docker for deploy
```

## 新生接机使用指南/Getting Started
**请使用电脑浏览器打开[接机系统](http://airpick.uflcsa.org/)以保证所有功能正常显示**
进入网站后会自动跳转至登录/注册界面

### 注册-登录/Registration-Login

    第一步：根据表格填写基本信息
        1. 为了以后接机方便核对信息，名字请使用真名
        2. Email 推荐使用 @ufl.edu 的，以后将会用于登录，找回密码，接机请求提示等
        3. 请再三核实你的微信号是否正确，因为这会使志愿者联系你的首要方式
        4. 微信号填写后无法自行修改，如果后期发现填错了需要联系 CSA IT 部负责人手动修改（联系方式见页面底部，请注明需要修改接机联系微信号）
        5. 如果还没有美国电话号码可不填写电话

    第二步：验证Email
        1. 点击 Verify Email 一栏右侧的 Get Code 按钮
        2. 查看你的 Email，你会收到一个有验证码的邮件
        3. 把验证码填入对 Verify Email 的话框内

    第三步：登录
        1. 返回登录界面
        2. 使用你的 Email 或者用户名进行登录

### 修改用户信息及密码/Account Information and Password
   
![account_info_img](https://github.com/ufcsa/airpick/blob/edit_readme/readme_imgs/account_info_b.png?raw=true)

    将鼠标放置在右上角的用户名处会出现修改个人信息及密码的选项
    
    修改个人信息：
        1. 点击 Edit Profile 进入修改界面进行修改
        2. 可以修改名字，Email，电话号码
        3. 如果有信息变动请及时更新，以便接机时联系
        4. 如果需要修改微信ID，请联系CSA IT部负责人（联系方式见页面底部，请注明需要修改接机联系微信号）
        
    修改密码：
        1. 点击 Change Password 进入修改密码界面
        2. 需要提供旧密码才能修改

### Publish-Edit-Cancel Requests/发布-编辑-取消接机或住宿请求

![my_req_center_img](https://github.com/ufcsa/airpick/blob/edit_readme/readme_imgs/req_ctr_b.png?raw=true)

    点击左上角的 My Requests 进入发布以及查看已经发布的请求界面
    
    发布请求：
        1. 点击 Add Airpick Request 进入发布请求界面
        2. 填写到达日期以及时间，默认为美东时区，如果有特殊情况请和志愿者联系
        3. 行李信息请如实填写，以便志愿者安排车内空间
        
    查看自己已发布的请求：
        1. 自己发布的请求会出现在 My Request Center 里面
        2. 在 Action 一栏可以修改或者删除请求
        3. 在 Status 一栏可以查看请求状态
            a. Looking for volunteers: 暂时还没有人接受你的请求，请耐心等待
            b. Show Volunteer Info: 
                * 已经有人接受了你的请求，可是行程未完成，可点击按钮查看志愿者联系方式。
                * 如果请求刚刚被接受，可能点击按钮不会有信息出现，请等待几分钟后刷新界面就可以看到信息。
                * 超过指定接机时间之后不久就会看不到志愿者信息，建议及时截图保存，如果后期需要查看已经消失的志愿者信息，请联系CSA IT部负责人（联系方式见页面底部，请注明需要查看志愿者信息）
            c. trip finished: 行程已经完成。
                * 如果需要查看已经消失的志愿者信息，请联系CSA IT部负责人（联系方式见页面底部，请注明需要查看志愿者信息）


## 注意事项/Caveats

### CSA 志愿者可以提供接机的场地/地点

1. 建议新生选择最终飞抵盖恩斯维尔 Gainesville Regional Airport(GNV)，CSA 将全力保证为到达 GNV 机场的新生提供接机。今年的接机系统会使用到**9月4日**，请尽早发布接机请求。

2. 已提前购买机场大巴（比如 red coach）来 Gainesville 的新生。同样可以使用接机系统联系志愿者免费接送，但请在使用接机系统时注意注明大巴的到达时间和地点。

3. 对于飞抵 Orlando(MCO)，Jacksonville(JAX)机场的同学 ，由于路途遥远（往返需要四至五小时），CSA 不保证有志愿者接机，对此 CSA 表示歉意。(可以选择 Red Coach，Greyhound，GMG 等大巴作为交通方案。)

4. 为了保证同学们的安全，新生或志愿者都务必用真实身份信息注册，一旦发现不采用真实身份以后接机系统永久列入黑名单。新生或志愿者如果对匹配到的志愿者或新生的身份有怀疑请及时联系 CSA 成员。

### 接机流程

* 请新生务必按照我们要求，提供并核实个人信息。

* 当您填写完旅程的信息之后，接机请求会被发布在接机网站上，等待志愿者接受。请新生在接机系统中核实自己的信息，比如接机机场和时间（时间都以当地时间为准）。

* 当志愿者接受请求之后，新生会收到请求被接受的 Email（注册网站时提供的 Email）。新生和志愿者可以在接机网站看到对方联系方式。请新生和志愿者提前与对方联系，以保证接机顺利。
    * _**有时因为系统延迟可能在请求已被接受的 Email 里面没有完整的志愿者信息，可以等待几分钟后自行登录接机网站，进入 My Request Center 查看完整志愿者信息**_

* 请您在抵达后按照机场的指示前往指定行李传送带(Baggage Claim)提取托运行李，拿好行李之后前往新生和志愿者先前约定好的地方见面。由于我们的华人面孔，新生与接机者之间的相认十分简单，请不必担心。如果不放心，可以提前留好联系方式，机场有免费 WiFi。

* 每位新生必须自己注册，且只能注册一次。凡是成功注册申请接机的同学，CSA 可兑现上一章节中相关的承诺。对于未能完成这一过程，也未在抵达美国前通过其他渠道联系 CSA 的同学，CSA 也会尽量代为安排接机，但资源原则上会被优先安排给已注册的同学。

* 注册时，您需要设置一个用户名和密码。这样可以保证您从返系统修改并更新自己的信息。个人信息必须完全准确无误。

* CSA 承诺不会向第三方泄露您的个人信息。

### 各种意外或突发事件的处理

* 新生因故改变航班，请尽早通知志愿者。
   * 如果在转机过程中误机或航班延误，请新生在第一时间通过微信联系接机志愿者，如果不能协调，请尽快联系 CSA 重新安排。可以使用机场 WIFI，投币电话或借用候机大厅其他乘客的手机来联系 CSA 紧急联系人（联系方式见页面底部）。

* 如果原定的志愿者因故无法前往，CSA 会尽力安排新的志愿者前往，同时 CSA 会尽可能通知您本人。

* 如果您在已经提取了行李之后还没有见到接机者，请您在原地耐心等候一段时间，并尝试与接机志愿者联系，如果半小时内依然无法取得联系，请联系 CSA 紧急联系人（联系方式见页面底部），我们会根据情况为您做出适当的安排。

* 若遇紧急突发事件威胁到您的人身安全，请立刻拨打 911 联系美国警方。


### CSA负责人联系方式
* 副主席：Yiling Zhang
    * 微信：bobomomu
    * 电话：3523284686
*  服务部负责人：Yu Zhu
    * 微信：yuyu-zuzu
*  IT部负责人：Shida Yang
    * 微信：da_417645885