### 1.目录介绍

    ——src（组件源码） 
    ——example（组件demo）
    ——lib (组件编译之后代码)

### 2.开发

    执行 npm run dev
    默认使用端口号 12315  package.json里面配置
    如需更改端口号 执行 npm run dev -- -p端口号

    该模式下使用热更新 更改组件或demo代码会自动更新

### 3.编译组件
    
    执行npm run  build

### 4.发布组件

    第三步执行后 更改package.json的version字段执行 npm publish


### 5.组件规范
    目前的规范如下

    src 目录下index.js 暴露组件
        每个组件对应一个文件夹原则上文件夹名字小写
        每个组件内部有一个index.js 暴露组件以及引入对应的样式文件 （style文件夹放置组件样式 默认使用sass）
        react组件使用.jsx后缀 用来区分组件文件和其他的功能函数文件
    _util文件夹用来存放公用方法
    images文件夹用来存放图片
    less文件夹存放公共less文件

### 6.使用

-   安装
    
    ```
    npm install lyxcool-test
    ```

-   按需加载
    使用 babel-plugin-import 同antd
    .babelrc or babel-loader 配置
    
    ```
    {
      "plugins": [
        ["import", { libraryName: "lyxcool-test" , "style" : true }]
      ]
    }
    ```

-   全局样式
    
    ```
    require('lyxcool-test/lib/less')
    ```  
    
-  组件使用  

    ```
    import { LyxHeader } from 'lyxcool-test'
    
    ReactDOM.render(<LyxHeader />, root)
    
    ```







    


