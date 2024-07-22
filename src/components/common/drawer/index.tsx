import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
export const CustomDrawer = ({
  body = <div></div>,
  open = false,
  title = "Character details",
  closeHandler = () => {},
}: {
  body?: any;
  open?: boolean;
  title?:string;
  closeHandler: any;
}) => {
  return (
    <Drawer open={open} onOpenChange={(state)=>{
        if(!state)closeHandler()
    }}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-2">
          <div
            className="text-base text-blue-500 font-semibold text-left cursor-pointer"
            onClick={closeHandler}
          >
            Back
          </div>
          <DrawerTitle className="mt-2">{title}</DrawerTitle>
          {body}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
