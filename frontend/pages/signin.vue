<template>
  <v-container fluid fill-height>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="5">
        <div class="my-auto mx-3 text-center">
          <p class="display-2 font-weight-black">🚀 Nest</p>
        </div>
      </v-col>
      <v-col cols="12" sm="7">
        <v-card class="my-10">
          <v-card-title>ลงชื่อเข้าใช้งาน</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                color="purple"
                v-model="form.email"
                :rules="[$rules.required, ...$rules.emailRules]"
                label="อีเมล"
              />
              <v-text-field
                color="purple"
                type="password"
                v-model="form.password"
                :rules="[$rules.required]"
                label="รหัสผ่าน"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn color="purple white--text" @click="submit()"> เข้าสู่ระบบ </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'full-screen',
  head() {
    return {
      title: 'ลงชื่อเข้าใช้งาน',
      meta: [
        {
          hid: 'ZTX App - ลงชื่อเข้าใช้งาน',
          name: 'ZTX App - ลงชื่อเข้าใช้งาน',
          content: 'ZTX App | ลงชื่อเข้าใช้งาน',
        },
      ],
    }
  },
  data: () => ({
    loading: false,
    form: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapGetters('messages', ['getMessage']),
  },
  methods: {
    async submit() {
      this.$loader(true)
      try {
        await this.$axios.post('/auth/signin', this.form)
        this.messages({
          title: 'เข้าสู่ระบบสำเร็จ',
          message: 'เข้าสู่ระบบสำเร็จ',
          color: 'success',
        })
      } catch (error) {
        console.error(error)
      }
      this.$loader(false)
    },
  },
}
</script>
