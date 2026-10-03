
export class View {

    public static instance: View;

    public getInstance(): View {
        return View.instance;
    }

    constructor() {

        if (View.instance) {
            return View.instance;
        }

        View.instance = this;
    }
}