class View {
    constructor({ changeFlatType, changeFlatSize, addAdditService }) {
        this.flatSizeSliderNode = document.getElementById("flatSizeSlider");
        this.typeFlatSelectorNode = document.getElementById("typeFlatSelector");
        this.totalPriceNode = document.getElementById("totalPrice");
        this.metrPriceNode = document.getElementById("metrPrice");
        this.flatSizeSliderNode = document.getElementById("flatSizeSlider");
        this.flatSizeValueNode = document.getElementById("flatSizeValue");
        this.compositions = document.getElementById("compositions");
        this.whatNeedsAddNode = document.getElementById("whatNeedsAdd");
        this.additionalServicesNode =
            document.getElementById("additionalServices");

        this.typeFlatSelectorNode.addEventListener("change", changeFlatType);
        this.flatSizeSliderNode.addEventListener("change", changeFlatSize);

        this.compositions.addEventListener("click", this._handlerCompositions);
        this.whatNeedsAddNode.addEventListener(
            "click",
            this._handlerAddWhatNeeds
        );
        this.additionalServicesNode.addEventListener(
            "click",
            this._handlerAddService
        );

        this.addAdditService = addAdditService;
    }

    renderPrice(total, metrPrice) {
        this.totalPriceNode.innerText = total + "₽";
        this.metrPriceNode.innerText = metrPrice + " ₽/м2";
    }

    renderFlatSize(value) {
        this.flatSizeValueNode.innerText = value;
    }

    getRoomAreaValue() {
        return this.flatSizeSliderNode.value;
    }

    _handlerChangeFlatType = () => {
        const typeFlatSelectorNode =
            document.getElementById("typeFlatSelector");
        this.changeFlatType(typeFlatSelectorNode.value);
    };

    _handlerCompositions = (event) => {
        const composition = event.target.closest("div");
        const compositionAmountNode = composition.querySelector(
            ".quantity-selector__quantity"
        );

        if (event.target.className == "quantity-selector__add") {
            compositionAmountNode.innerText =
                Number(compositionAmountNode.innerText) + 1;
        }
        if (event.target.className == "quantity-selector__subtract") {
            if (compositionAmountNode.innerText == "0") return;
            compositionAmountNode.innerText =
                Number(compositionAmountNode.innerText) - 1;
        }
    };

    _handlerAddWhatNeeds = (event) => {
        const whatNeedsAddBtnNode = event.target;
        if (!whatNeedsAddBtnNode.classList.contains('what-needs-add__option')) return 
        whatNeedsAddBtnNode.classList.toggle("what-needs-add_red");
        const addedImg =
            '<img class="what-needs__img" src="./img/calculator/what-need-selected.png">';
        whatNeedsAddBtnNode.innerHTML += addedImg;
    };

    _handlerAddService = (event) => {
        const closestDiv = event.target.closest(".addit-service");
        let additPrice = Number(closestDiv.getAttribute("value"));
        const img = closestDiv.querySelector("img");

        if (closestDiv.classList.contains("addit-service_active")) {
            additPrice = -additPrice;
            closestDiv.classList.remove("addit-service_active");
            img.classList.remove("addit-service__img_added");
        } else {
            closestDiv.classList.add("addit-service_active");
            img.classList.add("addit-service__img_added");
        }

        this.addAdditService(additPrice);
    };
}
