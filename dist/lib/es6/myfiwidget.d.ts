interface IWidgetParams {
    container?: string;
    inn?: string;
    partnerId: string;
    fontFamily?: string;
    style?: string;
}
export default function createMYFIWidget(params?: IWidgetParams): string;
export {};
