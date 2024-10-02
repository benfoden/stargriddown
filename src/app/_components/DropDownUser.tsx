import { CaretUpIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Button from "./Button";
import DropDownMenu from "./DropDown";

export default async function DropDownUser() {
  return (
    <DropDownMenu isUserMenu userProfileIconUrl={""}>
      <Link href={"/home"}>
        <Button variant="menuElement">
          Home <HomeIcon className="h-4 w-4" />
        </Button>
      </Link>

      <Link href={"/settings"}>
        <Button variant="menuElement">
          Settings <GearIcon className="h-4 w-4" />
        </Button>
      </Link>

      <Link href={"/"}>
        <Button type="submit" variant="menuElement">
          Top page <CaretUpIcon className="h-4 w-4" />
        </Button>
      </Link>
    </DropDownMenu>
  );
}
