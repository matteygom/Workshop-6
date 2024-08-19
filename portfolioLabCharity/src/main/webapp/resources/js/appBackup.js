document.addEventListener("DOMContentLoaded", function() {

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit


      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));

      // submit(e)
      // {
      //   e.preventDefault();
      //
      //   this.collectFormData();
      // }
      //
      // collectFormData()
      // {
      //   this.formData = {};
      //   const summaryFields = this.$form.querySelectorAll('.form-summary');
      //
      //   // Pobranie wartości pól
      //   const inputs = this.$form.querySelectorAll('input, select');
      //   inputs.forEach(input => {
      //     this.formData[input.name] = input.value;
      //   });
      //
      //   // Wyświetlenie wartości w podsumowaniu
      //   summaryFields.forEach(field => {
      //     const fieldName = field.dataset.name;
      //     if (this.formData[fieldName]) {
      //       field.innerText = this.formData[fieldName];
      //     }
      //   });
      // }

    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      // if (!this.validateForm()) {
      //   return;
      // }

      this.$step.innerText = this.currentStep;

      // Pokaż/ukryj odpowiednie sekcje
      this.slides.forEach(slide => {
        slide.classList.remove("active");
      });
      this.slides[this.currentStep - 1].classList.add("active");


      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      // TODO: get data from inputs and show them in summary
    }

    validateForm() {
      let valid = true;
      const fields = this.$form.querySelectorAll(`[data-step="${this.currentStep}"] input, [data-step="${this.currentStep}"] select`);

      fields.forEach(field => {
        if (field.value.trim() === "" && field.required) {
          field.classList.add("error");
          valid = false;
        } else {
          field.classList.remove("error");
        }
      });

      return valid;
    }

  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
