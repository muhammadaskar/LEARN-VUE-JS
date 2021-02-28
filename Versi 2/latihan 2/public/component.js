const Home = {
    template: '<div>Home</div>'
}

const About = {
    template: '<div>About</div>'
}

const NotVound = {
    template: '<div>Page Not Found</div>'
}

const Kelas = {
    props: ['items', 'input', 'nama'],
    template: `<div>
        <!-- <img :src="gambar" alt="" width="150"> -->

        <h3>Tambah Kelas</h3>
        <form v-on:submit.prevent="submitkelas">
            <p><input type="text" placeholder="Nama Kelas" v-model="kelas.judul">
                <div class="error" v-if="error.judul"> {{ error.judul }} </div>
            </p>
            <div class="input-group">
                <label>Deskripsi</label><br>
                <textarea v-model="kelas.deskripsi"></textarea>
                <div class="error" v-if="error.deskripsi"> {{ error.deskripsi }} </div>
            </div>
            <div class="input-group">
                <img :src="previewImg" alt="" width="150" v-if="previewImg">
                <label v-if="!previewImg">Masukkan Gambar</label><br>
                <input type="file" ref="gambar" v-on:change="upload"/>
            </div>
            <button type="submit">Submit</button>
        </form>
        <ul>
            <li v-for="(item, index ) in items">
                <img :src="urlGambar(item.gambar)" width="90">
                <p>
                {{ item.judul }}<br>
                    <a href="" v-on:click.prevent="$emit('hapuskelas', item.id)">hapus
                    </a>
                    <router-link :to="'kelas/'+item.id">detail
                    </router-link>
            </p>
            </li>
            </ul>
    </div>`,
    data: function(){
        return{
            kelas: {
                judul: '',
                deskripsi: '',
                gambar: ''
            },
            previewImg: '',
            error: {
                judul: '',
                deskripsi: ''
            }
        }
    },
    methods: {
        urlGambar: function(gambar){
            return gambar ? './img/' + gambar : ''
        },
        submitkelas: function(){
            this.error.judul = ''
            this.error.deskripsi = ''

            if (this.kelas.judul == ''){
                this.error.judul = 'Judul Is Required'
                console.log(this.error.judul)
            }
            if (this.kelas.deskripsi == ''){
                this.error.deskripsi = 'Deskripsi Is Required'
                console.log(this.error.deskripsi)
            }
            if(this.kelas.judul && this.kelas.deskripsi){
                const data = {
                    id: uuidv4(),
                    judul: this.kelas.judul,
                    deskripsi: this.kelas.deskripsi,
                    gambar: this.kelas.gambar,
                }
                this.$emit('submitkelas', data)

                this.kelas.judul = ""
                this.kelas.deskripsi = ""
                this.kelas.gambar = ""
                this.previewImg = ""
                this.$refs.gambar.value = ""

            }
        },
        upload: function(event){
            const img = event.target.files[0].name
            this.kelas.gambar = img
            this.previewImg = URL.createObjectURL(event.target.files[0])
        }
    }
}


const detailKelas = {
    template: `
    <div>
    <template v-if="detailKelas">
        <img :src="urlGambar(detailKelas.gambar)" width="220">
        <h2>Id : {{ $route.params.id }}</h2>
        <h3>Judul : {{ detailKelas.judul }}</h3>
        <p>Deskripsi : {{ detailKelas.deskripsi }} </p>
    </template>
    <p v-else class="error">Kelas Tidak Ada</p>
    <router-link to="/kelas">Kembali</router-link>
    </div>
    `,
    data(){
        return{
            detailKelas: {

            }
        }
    },
    created(){
        this.filterKelas()
    },
    methods: {
        filterKelas(){
            let kelas = JSON.parse(localStorage.getItem('kelas'))
            let id = this.$route.params.id
            //let item = kelas.filter(k => k.id == id)
            let data = db.ref('kelas/' +id)
            data.on('value', (item) => {
                this.detailKelas = item.val()
            })

            //this.detailKelas = item[0]
        },
        urlGambar: function(gambar){
            return '../img/' + gambar
        }
    }
}


Vue.component('header-component', {
    props: ['nama'],
    template: `<header>
        <h1>What is {{ nama }}</h1>
        <p>{{ pesan }}</p>
    </header>`,
    data: function() {
        return {
            pesan: 'Hello World'
        }
    }
})

Vue.component('footer-component', {
    template: `<footer>
        <slot></slot>
    </footer>`
})

