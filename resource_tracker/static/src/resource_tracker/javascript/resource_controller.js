import { Controller, Application } from '@hotwired/stimulus'
import Cookies from 'js-cookie'

class ResourceController extends Controller {
    static targets = [ "output", "id" ]

    increment() {
        this.current = this.current + 1
    }

    decrement() {
        this.current = this.current - 1
    }

    get current() {
        return parseInt(this.outputTarget.textContent)
    }

    get id() {
        return this.idTarget.id
    }

    set current(next) {
        this.outputTarget.textContent = next
        fetch(`${location.origin}/resource-tracker/api/player-resource-instances/${this.id}/`, {
            method: "PATCH",
            body: JSON.stringify({"current_ammount": next}),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        });
    }
}

window.Stimulus = Application.start()
Stimulus.register("resource", ResourceController)
