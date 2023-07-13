class View {
    constructor({
        changeFlatType,
        changeFlatSize
    }) {
        this.flatSizeSliderNode = document.getElementById('flatSizeSlider');
        this.typeFlatSelectorNode = document.getElementById('typeFlatSelector');
        this.totalPriceNode = document.getElementById('totalPrice');
        this.metrPriceNode = document.getElementById('metrPrice');
        this.flatSizeSliderNode = document.getElementById('flatSizeSlider');
        this.flatSizeValueNode = document.getElementById('flatSizeValue');
        this.compositions = document.getElementById('compositions');
        this.whatNeedsAddNode = document.getElementById('whatNeedsAdd');

        this.typeFlatSelectorNode.addEventListener('change', this._handlerChangeFlatType);
        this.flatSizeSliderNode.addEventListener('change', this._handlerChangeFlatSize);
        this.compositions.addEventListener('click', this._handlerCompositions);
        this.whatNeedsAddNode.addEventListener('click', this._handlerAddWhatNeeds);

        this.changeFlatType = changeFlatType;
        this.changeFlatSize = changeFlatSize;



    }

    render(total, metrPrice) {
        this.totalPriceNode.innerText = total + '₽';
        this.metrPriceNode.innerText = metrPrice + ' ₽/м2';
    }

    renderFlatSize(value) {
        this.flatSizeValueNode.innerText = value;
    }

    getFlatSize() {
        return this.flatSizeSliderNode.value;
    }

    getFlatType() {
        return this.typeFlatSelectorNode.value;
    }

    getRoomAreaValue() {
        return this.flatSizeSliderNode.value;
    }

    _handlerChangeFlatType = () => {
        this.changeFlatType(this.getFlatType());
    }
    _handlerChangeFlatSize = () => {
        this.renderFlatSize(this.getFlatSize());
        this.changeFlatSize(this.getFlatSize());
    }
    _handlerCompositions = (event) => {
        const composition = event.target.closest('div');
        const compositionAmountNode = composition.querySelector('.quantity-selector__quantity');

        if (event.target.className == 'quantity-selector__add') {
            compositionAmountNode.innerText = Number(compositionAmountNode.innerText) + 1;
        }
        if (event.target.className == 'quantity-selector__subtract') {
            if (compositionAmountNode.innerText == '0') return
            compositionAmountNode.innerText = Number(compositionAmountNode.innerText) - 1;
        }
    }
    _handlerAddWhatNeeds = (event) => {
        const whatNeedsAddBtnNode = event.target;
        whatNeedsAddBtnNode.classList.toggle('what-needs-add_red');
        const addedImg = '<img class="what-needs__img" src="../../img/calculator/what-need-selected.png">'
        whatNeedsAddBtnNode.innerHTML += addedImg;
    }   
}