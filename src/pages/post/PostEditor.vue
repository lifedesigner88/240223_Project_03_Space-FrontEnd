<script>
import {ref} from 'vue';
import AppSidebar from "components/layout/AppSidebar.vue";
import {axiosInstance} from "boot/axios";

const BASE_URL = "http://localhost:8080"

export default {
  components: {AppSidebar},

  setup() {
    const title = ref('');
    const contents = ref('');
    const spaceId = ref(2);
    const postStatus = ref('OPEN');
    const thumbnail = ref([])
    const attachFileList = ref([])


    return {
      title,
      contents,
      spaceId,
      postStatus,
      thumbnail,
      attachFileList,
    };
  },



  methods: {
    async writePost() {
      if (confirm("등록하시겠습니까?")){
        try {
          const registerData = new FormData();

          // for (let i = 0; i < this.attachFileList.length; i++) {
          //   let attachFileList = this.attachFileList[i];
          //   registerData.append(`attachFileList${i + 1}`, attachFileList);
          // }
          //
          // for (let i = 0; i < this.thumbnail.length; i++) {
          //   let thumbnailTemp = this.thumbnail[i];
          //   registerData.append(`thumbnail${i + 1}`, thumbnailTemp);
          // }

          registerData.append("title", this.title)
          registerData.append("contents", this.contents)
          registerData.append("postStatus",this.postStatus)
          registerData.append("spaceId", this.spaceId)
          registerData.append("thumbnail", this.thumbnail)


          for (let entry of registerData.entries()) {
            console.log(entry);
          }
          await axiosInstance.post(`${BASE_URL}/api/post/create`, registerData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (e) {
          console.log(e + "게시글 작성시 전송 오류")
        } // axios
      } // confirm
    } // function(writePost)
  } // method end
};
</script>

<template>
  <q-page class="sj-container">

      <q-uploader
        v-model="thumbnail"
        label="Thumbnail"
        color="amber"
        accept="image/*"
        text-color="black"
        style="max-width: 300px"
        class="file__thumbnail"
      />

      <q-uploader
        v-model="attachFileList"
        label="Files upload"
        multiple
        no-thumbnails
        style="max-width: 300px"
        class="file__multiple"
      />

    <div class="sj-content">

      <q-btn label="Submit" @click="writePost" class="submit__btn"></q-btn>
      <q-input outlined v-model="title" label="Title" class="title__box"/>

      <q-editor
        v-model="contents" min-height="60vh"
        class="content-box"
        :toolbar="[
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify']
        }
      ],
      ['bold', 'italic', 'strike', 'underline'],

      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: [
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'code'
          ]
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7'
          ]
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana'
          ]
        },
        'removeFormat'
      ],
      ['undo', 'redo'],
      ['fullscreen','viewsource']
    ]"
        :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    }"

      />

    </div>

  </q-page>
  <AppSidebar></AppSidebar>
</template>


<style scoped>

.sj-container {
  width: 100vw;
  //background-color: red;
  display: grid;
  grid-template-columns: 2.7fr 8fr 3fr;
  grid-template-rows: 2fr 5fr;
  grid-gap:25px
}

.sj-content {
  box-sizing: border-box;
  padding-top: 4vh;;
  //background-color: gray;
  width: 100%;
  height: 100%;
  grid-column: 2/3;
  grid-row: 1/3;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
}

.submit__btn {
  background-color: orange;
  color: white;
  border: none;
  width: 200px;
  height: 50px;
  font-size: 22px;
  margin: 10px 0;
  letter-spacing: 5px;
}

.title__box {
  width: 100%;
  margin: 20px 0;
  box-sizing: border-box;
  border: 2px solid orange;
  border-radius: 4px;
  font-size: 32px;
  color: orange;
  background-color: #ffebba;
  &:hover {
    background-color: #ffebba;
    color: orange;
    outline: none;
  }
  &:focus {
    background-color: red;
    color: orange;
    outline: none;
  }
}


.content-box {
  margin: 10px 0;
  width: 100%;
  background-color: #ffebba;
  font-size: 2em;
}


.file__thumbnail {
  grid-column: 3/4;
  grid-row: 1/2;
}

.file__multiple {
  grid-column: 3/4;
  grid-row: 2/3;
}
</style>
