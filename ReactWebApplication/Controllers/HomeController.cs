using Newtonsoft.Json.Linq;
using ReactWebApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactWebApplication.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        private static List<string> items = new List<string>{"Test1","Test2", "Test3", "Test4", "Test5", "Test6" };

        [HttpPost]
        public JsonResult AddItem( string id)
        {
            try
            {
                if (items.Contains(id))
                {
                    return Json(new { success = false, message = "Add different value"});
                }
                items.Add(id);
                return Json(new { items, success = true, message = "Item added successfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error deleting item", error = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult EditItem(List<string> iitems)
        {
            try
            {
                if (iitems.Count() != iitems.Distinct().Count())
                {
                    return Json(new { success = false, message = "Add different value" });
                }
                items =iitems;
                return Json(new { items, success = true, message = "Item added successfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error deleting item", error = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult DeleteItem(string id)
        {
            try
            {
                items.Remove(id);
                return Json(new { items, success = true, message = "Item deleted successfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error deleting item", error = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetItems()
        {
            //var itemss = new List<string> { "Item 1", "Item 2", "Item 3", "Item 4" };

            return Json(items, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                // Mock user authentication
                if (model.Username == "admin" && model.Password == "password123")
                {
                    Session["Username"] = model.Username.ToString();
                    return Json(new { success = true, message = "Login successful!" });
                }
                else
                {
                    return Json(new { success = false, message = "Invalid credentials" });
                }
            }
            else
            {
                return Json(new { success = false, message = "Invalid input" });
            }
        }

        [HttpPost]
        public JsonResult Logout()
        {
            try
            {
                // Clear session data if you're using server-side session
                Session["Username"] = null;
                Session.Clear();
                Session.Abandon();

                // Clear authentication token if you're using a token-based system (JWT, etc.)
                // If you're storing tokens in cookies, remove the cookie
                Response.Cookies["authToken"].Expires = DateTime.Now.AddDays(-1); // Set cookie expiration to a past date

                // If you're using JWT tokens stored in cookies or localStorage, make sure to remove the token on the client-side

                // Return a successful logout response
                return Json(new { success = true, message = "Logout successful!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error during logout: " + ex.Message });
            }
        }
    }
}