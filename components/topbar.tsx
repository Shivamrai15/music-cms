"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";
import { Sidebar } from "./sidebar";

export const Topbar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="md:hidden">
                <MenuIcon/>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-6 h-full overflow-y-auto">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}
