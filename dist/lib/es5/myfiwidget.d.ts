interface IWidgetParams {
    container?: string;
    inn?: string;
    partnerCompanyId: string;
    partnerUserId: string;
    fontFamily?: string;
    style?: string;
    apiUrl?: string;
}
export default function createMYFIWidget(params?: IWidgetParams): void;
export {};
