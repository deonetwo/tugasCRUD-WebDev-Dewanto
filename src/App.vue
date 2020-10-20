<template>
  <div>
    <div class="container">
      <h2>List Berita</h2>
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" v-show="!updateSubmit">Add Berita</h5>
                    <h5 class="modal-title" v-show="updateSubmit">Edit Berita</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <input type="hidden" v-model="form.id">
                    <label for="exampleFormControlInput1">Judul Berita</label>
                    <input type="text" v-model="form.judul" class="form-control" id="exampleFormControlInput1">
                    <label for="exampleFormControlInput1">Kategori</label>
                    <input type="text" v-model="form.kategori" class="form-control" id="exampleFormControlInput1" placeholder="Pengumuman, Prestasi Mahasiswa, dll">
                    <label for="exampleFormControlTextarea1">Konten</label>
                    <textarea v-model="form.konten" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                    <button type="submit" v-show="!updateSubmit" @click="showModal = false,add()" class="btn btn-primary">Add</button>
                    <button type="button" v-show="updateSubmit" @click="showModal = false,update(form)" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <button class="btn btn-success" @click="showModal = true,clear()">Add New</button>
      <table class="table table-striped">
        <tr>
          <th>Judul Berita</th>
          <th>Kategori</th>
          <th>Konten</th>
          <th>Action</th>
        </tr>
        <tr v-for="paper in news" :key="paper.id">
          <th>{{paper.judul_berita}}</th>
          <td>{{paper.kategori}}</td>
          <td><p>{{paper.konten}}</p></td>
          <td>
            <button class="btn btn-sm btn-info edit" @click="edit(paper),showModal = true">Edit</button>
            <button class="btn btn-sm btn-danger delete" @click="del(paper)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>



<script>
/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
export default {
  data(){
    return{
        form: {
          id: '',
          judul: '',
          kategori: '',
          konten: ''
        },
        news: '',
        updateSubmit: false,
        showModal: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://localhost:4000/news').then(res => {
        this.news = res.data
      }).catch ((err) => {
        console.log(err);
        
      })
    },
    add(){
    axios.post('http://localhost:4000/news/', this.form).then(res => {
        this.load()
        this.form.judul = ''
        this.form.kategori = ''
        this.form.konten = ''
      })
    },
    edit(paper){ 
        this.updateSubmit = true
        this.form.id = paper.id
        this.form.judul = paper.judul_berita
        this.form.kategori = paper.kategori
        this.form.konten = paper.konten
    },
    clear(){
        this.form.judul = ''
        this.form.kategori = ''
        this.form.konten = ''
    },
    update(form){ 
       return axios.post('http://localhost:4000/update/', this.form).then(res => {
        this.load()
        this.form.id = ''
        this.form.judul = ''
        this.form.kategori = ''
        this.form.konten = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
      })
    },
    del(paper){
      //console.log(paper.id)
      return axios.post('http://localhost:4000/delete/', {id: paper.id}).then(res =>{
          this.load()
      })
    }
  }
}
</script>