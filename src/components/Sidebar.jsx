import { NavLink } from "react-router-dom";
import { Package2, Inbox, Calendar, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>TodoMaster</span>
        </NavLink>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
          <SidebarNavLink to="/" icon={<Inbox className="h-4 w-4" />}>
            Inbox
          </SidebarNavLink>
          <SidebarNavLink to="/today" icon={<Calendar className="h-4 w-4" />}>
            Today
          </SidebarNavLink>
          <SidebarNavLink to="/upcoming" icon={<CalendarDays className="h-4 w-4" />}>
            Upcoming
          </SidebarNavLink>
          <div className="mt-4">
            <h2 className="text-xs font-semibold uppercase text-muted-foreground">Projects</h2>
            <SidebarNavLink to="/project/1" icon={<Inbox className="h-4 w-4" />}>
              Project 1
            </SidebarNavLink>
            <SidebarNavLink to="/project/2" icon={<Inbox className="h-4 w-4" />}>
              Project 2
            </SidebarNavLink>
            <Button variant="outline" className="mt-2 w-full">
              Add Project
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

const SidebarNavLink = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
        isActive && "text-primary bg-muted",
      )
    }
  >
    {icon}
    {children}
  </NavLink>
);

export default Sidebar;