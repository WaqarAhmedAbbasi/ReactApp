# React App
This is the basic .Net MVC C# application containing react.js

# React Js:
How to integrate react js with .net mvc application

1)	First install 
a)	react.js 
b)	React.Web.MVC4 (it will install some other dependencies as well)
c)	JavaScriptEngineSwitcher.V8
d)	Microsoft.ClearScript.V8.Native.win-x64
e)	Microsoft.ClearScript.V8.Native.win-x86
f)	npm


2)	Addition in ReactConfig.cs 
a)	At top
using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.V8;
b)	In Configure method add below lines
JsEngineSwitcher.Current.DefaultEngineName = V8JsEngine.EngineName;
JsEngineSwitcher.Current.EngineFactories.AddV8();


3)	In Global.asax.cs in Application_Start method Add below line
ReactConfig.Configure();

4)	Adding HelloWorld.js file under “Script” and under newly created “App” folder
class CommentBox extends React.Component {
    render() {
        return (
            <div className="commentBox">Hello, world! I am a CommentBox.</div>
        );
    }
}
ReactDOM.render(<CommentBox />, document.getElementById('content'));}

5)	Add scripts sources in _Layout.cshtml file
       <script src="@Url.Content("~/Scripts/react/react.min.js")"></script>
    <script src="@Url.Content("~/Scripts/react/react-dom.min.js")"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

6)	Add external script in Index.cshtml file
<script src="~/Scripts/App/HelloWorld.js" type="text/babel"></script>


Now run the project.

