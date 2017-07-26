以下是标准 README 的内容

# searchBar

- category: UI
- chinese: 搜索
- type: UI组件

---

封装了nuke的input、Touchable、Text、Icon，使得搜索框变得更好用些。

## API

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
value | 输入框初始值 | String | 空
placeholder | 占位提示信息 | String | 输入关键字
editable | 是否允许用户输入 | Boolen | true
onSubmit | 用户点击搜索事件 | Function| 无
onClear | 用户点击清除icon事件 | Function | 无
onFocus | 搜索框聚焦事件 | Function | 无
onBlur | 搜索框失焦事件 | Function | 无
onChange | 原先input的onInput事件，要区别对待 | Function | 无


## 注意点

### 为什么要用搜索按钮？

[新增特性 (weex > 0.11)](http://nuke.taobao.org/nukedocs/packages/input.html) 新增 returnKeyType 指定键盘 return key 类型，以及对应的 onReturn 事件。

也就是说我们能够捕捉用户键盘的回车键了，介于有weex版本需要，暂时保留搜索按钮。

等后期千牛的weex版本全部高于0.11，可以考虑将搜索按钮去掉。

### 为啥onChange跟input有区别？

按照字面意思，onChange比onInput更好理解，所以我们这边做了一层转化，所以使用的时候要注意下。
