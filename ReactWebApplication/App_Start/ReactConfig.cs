using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.V8;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReactWebApplication.ReactConfig), "Configure")]

namespace ReactWebApplication
{
	public static class ReactConfig
	{
		public static void Configure()	
		{

            //ReactSiteConfiguration.Configuration
            //    .AddScript("~/Scripts/App/HelloWorld.jsx");
            
			JsEngineSwitcher.Current.DefaultEngineName = V8JsEngine.EngineName;
			JsEngineSwitcher.Current.EngineFactories.AddV8();

			// If you want to use server-side rendering of React components, 
			// add all the necessary JavaScript files here. This includes 
			// your components as well as all of their dependencies.
			// See http://reactjs.net/ for more information. Example:
			//ReactSiteConfiguration.Configuration
			//	.AddScript("~/Scripts/First.jsx")
			//	.AddScript("~/Scripts/Second.jsx");
			
			// If you use an external build too (for example, Babel, Webpack,
			// Browserify or Gulp), you can improve performance by disabling 
			// ReactJS.NET's version of Babel and loading the pre-transpiled 
			// scripts. Example:
			//ReactSiteConfiguration.Configuration
			//	.SetLoadBabel(false)
			//	.AddScriptWithoutTransform("~/Scripts/bundle.server.js")
		}
	}
}