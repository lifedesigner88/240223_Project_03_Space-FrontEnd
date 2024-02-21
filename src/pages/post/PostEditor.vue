<template>
  <div class="q-pa-md q-gutter-sm">
    <q-select outlined v-model="spaceId" :options="spaceIDOptions" 
      label="spaceId"
      emit-value
      map-options
      dense
      style="width: 150px; font-size: 10px; margin-bottom: 1rem;"
      bg-color="white"
    />
    <!-- 제목 입력란 -->
    <q-input outlined v-model="title" label="제목" bg-color="white" min-height="5rem" style="margin-bottom: 0rem;" />
    <!-- 본문 작성 에디터 -->
    <q-editor 
    v-model="contents" min-height="15rem"
    :dense="$q.screen.lt.md" 
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

    <q-btn color="primary" @click="writePost">글쓰기</q-btn>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from "axios";

export default {
  
  setup() {
    const title = ref('');
    const contents = ref('');
    const spaceId = ref('2');
    const postStatus= ref('OPEN');
    
    // spaceIDOptions 더미 데이터 정의
    const spaceIDOptions = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      // 여러 옵션들을 추가할 수 있습니다.
    ];

    return {
      title,
      contents,
      spaceId,
    };
  },
  methods:{
        async writePost(){
            try{                              
                confirm("등록하시겠습니까")
                const registerData = new FormData();
                registerData.append("title", this.title)
                registerData.append("contents", this.contents)
                registerData.append("spaceId", this.spaceId)
                registerData.append("postStatus", this.postStatus)
                // const token = localStorage.getItem('token');
                const headers= {Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHViaUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwODQ1NTQ2NiwiZXhwIjoxNzA4NDU3MjY2fQ.nJwAwGfyonncV-_nXrgFwYq8XH4dnpJscAXFMpuy5Fc`};
                // await axios.post(`${process.env.VUE_APP_BASE_URL}/item/create`, registerData, {headers});
                const response = await axios.post(`http://localhost:8080/api/post/create`, registerData, {headers});
                console.log(response.data);
                // location.href="/login"
                // this.$router.push(
                //     {name:'Login'}
                // )
            } catch(error){
                const error_message= error.response?.data.error_message;
                if(error_message){
                    console.log(error_message);
                    console.log(error);
                    alert(error_message);
                } else {
                    console.log(error);
                    alert("입력 값 확인 필요")
                }
            }
        }
    }
};
</script>
