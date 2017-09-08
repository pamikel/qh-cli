import {mapState} from 'vuex'
import {ResetMsg} from './comps'
import {clearSpace} from './filters'
import {health} from '../../api'

export default {
  data: () => ({
    health: false
  }),
  computed: mapState({
    msg: state => state.msg,
  }),
  components: {
    ResetMsg
  },
  filters: {
    clearSpace
  },
  async created() {
    const health = await health()
    if(health === 'ok') this.health = true;
  }
}
