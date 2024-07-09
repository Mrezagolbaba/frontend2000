import { useAddToHomeScreenPrompt } from "hooks/useAddToHomeScreenPrompt";
import { FC, useEffect, useState } from "react";
import { isMobile, isTablet, isFirefox, isIOS } from "react-device-detect";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Logo from "assets/img/logo-arsonex.png";
import IOSShare from "assets/icons/IOSShare";
import pwa from "assets/scss/components/InstallPWAPrompt/styles.module.scss";

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
      <div className={pwa.wrapper}>
        <ModalHeader toggle={toggle} className="pb-2">
          <div className="d-inline-flex flex-row align-items-center gap-3">
            <img src={Logo} loading="lazy" height="35px" width="35px" />
            <p className={`m-0 ${pwa.f16}`}>نصب آرسونیکس</p>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className={pwa.description}>
            برنامه را روی دستگاه خود نصب کنید تا در هر زمان به راحتی به آن
            دسترسی داشته باشید.
          </p>
          {isIOS && (
            <ol className={pwa["ordered-list"]}>
              <li className="mb-1 mt-4">
                روی{" "}
                <span className={pwa.icon}>
                  <IOSShare style={{ width: "25px", height: "30px" }} />
                </span>{" "}
                کلیک کنید.
              </li>
              <li>
                <span className={`${pwa.icon} p-1`}>Add to Home Screen</span> را
                انتخاب کنید.
              </li>
            </ol>
          )}
        </ModalBody>
        {!isIOS && (
          <ModalFooter className="justify-content-start">
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
