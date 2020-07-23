import {Injectable} from "@angular/core";

@Injectable()
export class ProgressBarService {

    private isLoading = false

    constructor() {
    }

    showProgressBar(): boolean {
        return this.isLoading
    }

    setIsLoading(bool: boolean): void {
        !bool ? setTimeout(() => this.isLoading = bool, 1000) : this.isLoading = bool
    }
}