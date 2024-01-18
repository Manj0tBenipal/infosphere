import { MessageDialog } from "@/public/types/mysc";
import { Button } from "@mui/joy";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function LoadingCurtain({
  properties,
  setProperties,
}: {
  properties: MessageDialog;
  setProperties: Function;
}) {
  return (
    <div className="curtain flex flex-center">
      <div className="message-box flex flex-center flex-column flex-gap-1">
        {/*
         *Rendered only when loading indicator is required
         */}
        {properties.loading && (
          <AiOutlineLoading3Quarters
            className="rotate"
            size={43}
            style={{ color: "var(--color-primary)" }}
          />
        )}
        <h3 style={{ textAlign: "center" }}>{properties.message}</h3>
        {/*
         *Displayed when loading property is false
         *means a message is being displayed
         */}
        {!properties.loading && (
          <Button
            onClick={() =>
              setProperties((prev: MessageDialog) => ({
                ...prev,
                isVisible: false,
              }))
            }
          >
            Ok
          </Button>
        )}
      </div>
    </div>
  );
}
