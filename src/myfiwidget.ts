import { defaultAgreements } from "./defaultAgreements";
import { bankGuaranteePage } from "./pages/bankGuaranteePage";
import { loanPage } from "./pages/loanPage";

export interface IAgreement {
  label: string;
  url?: string;
}

export interface IWidgetParams {
  container?: any;
  inn?: string;
  partnerCompanyId: string;
  partnerUserId: string;
  fontFamily?: string;
  style?: string;
  markerStyle?: string;
  apiUrl?: string;
  agreements?: Array<IAgreement>;
  mobileWidth?: string;
  tabs?: Array<string>;
  wrapper?: any;
  successMessage?: string;
}

export default function createMYFIWidget(params?: IWidgetParams) {
  const wrapper = document.querySelector(params.container || ".w-wrap");
  const inn = params.inn || "";
  const partnerCompanyId = params.partnerCompanyId;
  const partnerUserId = params.partnerUserId;
  const fontFamily = params.fontFamily || "Roboto";
  const style = params.style || "";
  const markerStyle = params.markerStyle || "";
  const apiUrl = params.apiUrl || "https://api.myfi24.ru/v3";
  const agreements = params.agreements || defaultAgreements();
  const defaultSuccessMessage = `<h2>Уважаем{sextype} {partOfName},</h2> <p class="w-success-msg">
Вы подали заявку на получение кредита в размере {amount} ₽ на срок {term}. Ваша заявка отправлена в:<br/> <ul>{banks}</ul> 
В ближайшее время с вами свяжутся менеджеры банков.</p>`;
  const successMessage = params.successMessage || defaultSuccessMessage;
  const mobileWidth = params.mobileWidth || "";
  const tabs = params.tabs || ["loan", "bank_guarantee"];

  let loanButton;
  let bankGuaranteeButton;

  const navContainer = document.createElement("div");
  navContainer.className = "nav-container";
  navContainer.style.display = "flex";
  navContainer.style.justifyContent = "flex-start";
  navContainer.style.gap = "4px";
  navContainer.style.marginBottom = "5px";
  wrapper.appendChild(navContainer);

  tabs.forEach((e) => {
    switch (e) {
      case "loan":
        loanButton = document.createElement("button");
        loanButton.className = "loan-button active";
        if (tabs.length > 1) {
          loanButton.innerText = "Кредит";
          loanButton.style.border = "1px solid #ecf1f7";
          loanButton.style.borderBottom = "none";
          loanButton.style.borderRadius = "5px 5px 0 0";
          loanButton.style.cursor = "pointer";
          loanButton.style.fontSize = "18px";
          loanButton.style.height = "30px";
          loanButton.style.background = "#ecf1f7";
          loanButton.style.display = "block";
          navContainer.appendChild(loanButton);
        } else {
          loanButton.style.border = "none";
        }
        break;
      case "bank_guarantee":
        bankGuaranteeButton = document.createElement("button");
        bankGuaranteeButton.className = "guarantee-button";
        bankGuaranteeButton.style.border = "none";
        if (tabs.length > 1) {
          bankGuaranteeButton.innerText = "Банковская гарантия";
          bankGuaranteeButton.style.border = "1px solid #ecf1f7";
          bankGuaranteeButton.style.borderBottom = "none";
          bankGuaranteeButton.style.borderRadius = "5px 5px 0 0";
          bankGuaranteeButton.style.cursor = "pointer";
          bankGuaranteeButton.style.fontSize = "18px";
          bankGuaranteeButton.style.height = "30px";
          bankGuaranteeButton.style.display = "block";
        }
          navContainer.appendChild(bankGuaranteeButton);
        break;
    }
  });

  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";
  wrapper.appendChild(contentContainer);

  function updateContainerWidth() {
    if (window.innerWidth < 769) {
      if (loanButton) loanButton.style.width = "100%";
      if (bankGuaranteeButton) bankGuaranteeButton.style.width = "100%";
    } else {
      if (loanButton) loanButton.style.width = "200px";
      if (bankGuaranteeButton) bankGuaranteeButton.style.width = "200px";
    }
  }

  updateContainerWidth();
  window.addEventListener("resize", updateContainerWidth);

  if (loanButton) {
    loanButton.onclick = () => {
      if (bankGuaranteeButton) bankGuaranteeButton.style.background = "#ecf1f7";
      loanButton.style.background = "#fff";
      loanPage(
        contentContainer,
        inn,
        apiUrl,
        partnerCompanyId,
        partnerUserId,
        fontFamily,
        style,
        markerStyle,
        agreements,
        mobileWidth,
        successMessage
      );
    };
  }

  if (bankGuaranteeButton) {
    bankGuaranteeButton.onclick = () => {
      bankGuaranteeButton.style.background = "#fff";
      if (loanButton) loanButton.style.background = "#ecf1f7";
      bankGuaranteePage(contentContainer, inn, apiUrl, partnerCompanyId, partnerUserId, successMessage);
    };
  }

  if (loanButton || bankGuaranteeButton) {
    if (tabs[0] === "loan") loanButton.click();
    if (tabs[0] === "bank_guarantee") bankGuaranteeButton.click();
  }
}
