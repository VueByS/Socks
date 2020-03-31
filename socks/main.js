Vue.component('product', {
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-show="inStock > 0">In stock</p>
                <p v-show="inStock == 0">Out of sale</p>
                <p>Shipping: {{ shipping }}</p>
                <product-details :details="details"></product-details>
                <div v-for="(variant, index) in variants" :key="variant.id"
                    class="color-box"
                    :style="{ backgroundColor: variant.color }"
                    @mouseover="updateProduct(index)">
                </div>
                <div class="cart-panel">
                    <button @click="addToCart" :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Add to Cart</button>
                    <button @click="removeFromCart"
                        :class="{ disabledButton: !inStock }">Remove from Cart</button>
                </div>
            </div>
        </div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variantIndex: 0,
            variants: [
                {
                    id: 2234,
                    color: "green",
                    image: './assets/vmSocks-green.png',
                    variantQuantity: 10
                },
                {
                    id: 2235,
                    color: "blue",
                    image: './assets/vmSocks-blue.jpg',
                    variantQuantity: 0
                }
            ],
        }
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.variantIndex].id)
        },
        removeFromCart: function(index) {
            this.$emit('remove-from-cart', this.variants[this.variantIndex].id)
        },
        updateProduct: function(index) {
            this.variantIndex = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.variantIndex].image
        },
        inStock() {
            return this.variants[this.variantIndex].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            else {
                return 2.99
            }
        }
    }
})
Vue.component('product-details', {
    template: `
        <div class="product-details">
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
    `,
    props: {
        details: {
            type: Array,
            required: true
        }
    }, 
})
var app = new Vue({
 el: '#app',
 data: {
     premium: false,
     cart: []
 },
 methods: {
     updateCart(id) {
         this.cart.push(id)
     },
     removeFromCart(id) {
        let index = this.cart.indexOf(id)
        if (index !== -1) this.cart.splice(index, 1)
     }
 }
})