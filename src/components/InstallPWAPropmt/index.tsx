import { useAddToHomeScreenPrompt } from "hooks/useAddToHomeScreenPrompt";
import { FC, useEffect, useState } from "react";
import { isMobile, isTablet, isFirefox, isIOS } from "react-device-detect";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Logo from "assets/img/logo-arsonex.png";
import IOSShare from "assets/icons/IOSShare";

const InstallPWAPrompt: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [prompt, promptToInstall] = useAddToHomeScreenPrompt();
  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(
      (isMobile || isTablet) &&
        (!!prompt || ((isFirefox || isIOS) && !isInStandaloneMode())),
    );
  }, [prompt]);

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <div style={{ backgroundColor: "#eee", borderRadius: "12px" }}>
        <ModalHeader
          toggle={toggle}
          style={{
            padding: "25px 0 10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="d-inline-flex flex-row align-items-center gap-3">
            <img src={Logo} loading="lazy" height="35px" width="35px" />
            <p className="m-0" style={{ fontSize: "16px" }}>
              نصب آرسونیکس
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <p style={{ fontSize: "12px", textAlign: "justify" }}>
            برنامه را روی دستگاه خود نصب کنید تا در هر زمان به راحتی به آن
            دسترسی داشته باشید.
          </p>
          {isIOS && (
            <ol
              style={{
                fontSize: "12px",
                marginTop: "-10px",
                padding: 0,
                paddingRight: "12px",
              }}
            >
              <li className="mb-1 mt-4">
                روی{" "}
                <span
                  style={{
                    backgroundColor: "#fff",
                    padding: "4px 0",
                    borderRadius: "4px",
                  }}
                >
                  <IOSShare style={{ width: "25px", height: "30px" }} />
                </span>{" "}
                کلیک کنید.
              </li>
              <li>
                <span
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                    padding: "2px",
                    borderRadius: "4px",
                  }}
                >
                  Add to Home Screen
                </span>{" "}
                را انتخاب کنید.
              </li>
            </ol>
          )}
        </ModalBody>
        {!isIOS && (
          <ModalFooter style={{ justifyContent: "flex-start" }}>
            <Button color="primary" outline onClick={promptToInstall}>
              نصب
            </Button>
            <Button onClick={toggle}>انصراف</Button>
          </ModalFooter>
        )}
      </div>
    </Modal>
  );
};

export default InstallPWAPrompt;
