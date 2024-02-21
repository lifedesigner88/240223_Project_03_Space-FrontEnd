<template>
  <div class="q-pa-md q-gutter-sm">
    <q-select outlined v-model="selectedSpaceID" :options="spaceIDOptions" 
    label="SpaceID"
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
    v-model="editor" min-height="15rem"
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

export default {
  
  setup() {
    const title = ref('QUASAR');
    const content = ref('What you see is <b>what</b> you get.');

    return {
      title,
      content,
    };
  },

};
</script>
