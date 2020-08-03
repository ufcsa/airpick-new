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

### Registration

        第一步：填写姓名
        1. 填写名字，用英文名或者汉语拼音
        2. 填写姓，用英文或者汉语拼音

        第二步：填写Email
        1. Email将会用于登录，找回密码，提示你的接机请求已经被接受
        2. 推荐使用 @ufl.edu 的Email，或者任何平时经常检查的Email

        第三步：填写用户名
        1. 用户名将会用于登录
        2. 详细要求见图片

        第四步：填写微信号
        1. 微信号将会用于新生和接机者之间的联系

        第五步：填写密码
        1. 详细要求见图片
        2. 以后可以修改

        第六步：选填美国电话号码和性别
        1. **这两项可以不填，填了的话方便更好的联系**

### Account Information

        1. 点击右上角的用户名进入修改信息界面
        2. 根据需求修改姓名，Email，电话号码
        建议尽量更新到最新的信息，以便接机的时候联系
        左侧可以选择修改密码和头像
        3. 修改密码需要填写现在密码
        新密码的要求和注册时候一样
        需要至少六个字符，至少一个数字，一个小写字母，一个大写字母，一个特殊字符

### Publish/Edit/Cancel Requests 发布/更新/取消接机或住宿请求

        点击"Add Your Request"来发布新的请求（"Pickup Requests"是所有人已经发布的接机请求）
        **一个账户同时只能发布一个接机请求**
        **所以如果你之前发布过并且没有取消**
        **点击"Add Your Request"会显示并允许修改你已经发布的信息**


## 注意事项/Caveat

### CSA 志愿者可以提供接机的场地/地点

1. 建议新生选择最终飞抵盖恩斯维尔 Gainesville Regional Airport(GNV)，CSA 将全力保证为到达 GNV 机场的新生提供接机。可以安排接机的时间，6 月 15 日（请尽量提前发布接机请求）至 8 月 30 日。

2. 已提前购买机场大巴（比如 red coach）来 Gainesville 的新生。同样可以可以使用接机系统联系志愿者免费接送，但请在使用接机系统时注意注明大巴的到达时间和地点（一般为 UF Commutor Lot）。

3. 对于飞抵 Orlando(MCO)，Jacksonville(JAX)机场的同学 ，由于路途遥远（往返需要四至五小时），CSA 不保证有志愿者接机，对此 CSA 表示歉意。(可以选择 Red Coach，Greyhound，GMG 等大巴作为交通方案。)

4. 为了保证同学们的安全，新生或志愿者都务必用真实身份信息注册，一旦发现不采用真实身份以后接机系统永久列入黑名单。新生或志愿者如果对匹配到的志愿者或新生的身份有怀疑请及时联系 CSA 成员。

### 接机流程

1. 请新生务必按照我们要求，提供并核实个人信息。

2. 当您填写完旅程的信息之后，接机请求会被发布在接机网站上，等待志愿者接受。请新生在接机系统中核实自己的信息，比如接机机场和时间（时间都以当地时间为准）。

3. 当志愿者接受请求之后，新生会收到请求被接受的 Email（注册网站时提供的 Email）。新生和志愿者可以在接机网站看到对方联系方式。请新生和志愿者提前与对方联系，以保证接机顺利。

4. 请您在抵达后按照机场的指示前往指定行李传送带(Baggage Claim)提取托运行李，拿好行李之后前往新生和志愿者先前约定好的地方见面。由于我们的华人面孔，新生与接机者之间的相认十分简单，请不必担心。如果不放心，可以提前留好联系方式，机场有免费 WiFi。

5. 每位新生必须自己注册，且只能注册一次。凡是成功注册申请接机的同学，CSA 可兑现上一章节中相关的承诺。对于未能完成这一过程，也未在抵达美国前通过其他渠道联系 CSA 的同学，CSA 也会尽量代为安排接机，但资源原则上会被优先安排给已注册的同学。

6. 注册时，您需要设置一个用户名和密码。这样可以保证您从返系统修改并更新自己的信息。个人信息必须完全准确无误。

7. CSA 承诺不会向第三方泄露您的个人信息。

### 各种意外或突发事件的处理

1. 新生因故改变航班，请尽早通知志愿者。
   如果在转机过程中误机或航班延误，请新生在第一时间通过微信联系接机志愿者，如果不能协调，请尽快联系 CSA 重新安排。可以使用机场 WIFI，投币电话或借用候机大厅其他乘客的手机来联系 CSA 紧急联系人。

2. 如果原定的志愿者因故无法前往，CSA 会尽力安排新的志愿者前往，同时 CSA 会尽可能通知您本人。

3. 如果您在已经提取了行李之后还没有见到接机者，请您在原地耐心等候一段时间，并尝试与接机志愿者联系，如果半小时内依然无法取得联系，请联系 CSA 紧急联系人，我们会根据情况为您做出适当的安排。

4. 若遇紧急突发事件威胁到您的人身安全，请立刻拨打 911 联系美国警方。
