parasails.registerPage('profiles', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    sortDirection: 'ASC',
    teamFilter: undefined,
    profilesToDisplay: [],
    platformFriendlyNames: {
      'darwin': 'macOS, iOS, ipadOS',
      'windows': 'Windows',
      'linux': 'Linux'
    },
    selectedTeam: {},
    modal: '',
    syncing: false,
    formData: {},
    formErrors: {},
    addProfileFormRules: {
      newProfile: {required: true}
    },
    editProfileFormRules: {},
    profileToEdit: {},
    cloudError: '',
    newProfile: undefined,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.profilesToDisplay = this.profiles;
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clickChangeSortDirection: async function() {
      if(this.sortDirection === 'ASC') {
        this.sortDirection = 'DESC';
        this.profilesToDisplay = _.sortByOrder(this.profiles, 'name', 'desc');
      } else {
        this.sortDirection = 'ASC';
        this.profilesToDisplay = _.sortByOrder(this.profiles, 'name', 'asc');
      }
      await this.forceRender();
    },
    changeTeamFilter: async function() {// Used by the team picker dropdown.
      if(this.teamFilter !== undefined){
        this.selectedTeam = _.find(this.teams, {fleetApid: this.teamFilter});
        let profilesOnThisTeam = _.filter(this.profiles, (profile)=>{
          return profile.teams && _.where(profile.teams, {'fleetApid': this.selectedTeam.fleetApid}).length > 0;
        });
        this.profilesToDisplay = profilesOnThisTeam;
      } else {
        this.profilesToDisplay = this.profiles;
      }
    },
    clickChangeTeamFilter: async function(teamApid) {// Used by the tooltip links.
      this.teamFilter = teamApid;
      this.selectedTeam = _.find(this.teams, {'fleetApid': teamApid});
      let profilesOnThisTeam = _.filter(this.profiles, (profile)=>{
        return profile.teams && _.where(profile.teams, {'fleetApid': this.selectedTeam.fleetApid}).length > 0;
      });
      this.profilesToDisplay = profilesOnThisTeam;
    },
    clickDownloadProfile: async function(profile) {
      if(!profile.teams){
        window.open('/download-profile?id='+encodeURIComponent(profile.id));
      } else {
        window.open('/download-profile?uuid='+encodeURIComponent(profile.teams[0].uuid));
      }
    },
    clickOpenEditModal: async function(profile) {
      this.profileToEdit = _.cloneDeep(profile);
      this.formData = {
        profile: _.clone(profile),
        newTeamIds: _.pluck(this.profileToEdit.teams, 'fleetApid'),
        target: profile.target === 'custom' ? 'custom' : 'all',
        labelTargetBehavior: profile.labelTargetBehavior ? profile.labelTargetBehavior : 'include',
        labels: profile.labels ? profile.labels : [],
      }
      this.modal = 'edit-profile';
      await this._getLabels();
    },
    clickOpenDeleteModal: async function(profile) {
      this.formData.profile = _.clone(profile);
      this.modal = 'delete-profile';
    },
    clickOpenAddProfileModal: async function() {
      this.$set(this.formData, 'target', 'all');
      this.$set(this.formData, 'labels', []);
      this.$set(this.formData, 'labelTargetBehavior', 'include');
      this.modal = 'add-profile';
      await this._getLabels();
    },
    closeModal: async function() {
      this.modal = '';
      this.formErrors = {};
      this.formData = {};
      this.cloudError = '';
      await this.forceRender();
    },
    submittedForm: async function() {
      this.syncing = false;
      this.closeModal();
    },
    handleSubmittingDeleteProfileForm: async function() {
      let argins = _.clone(this.formData);
      await Cloud.deleteProfile.with({profile: argins.profile});
      await this._getProfiles();
    },
    handleSubmittingAddProfileForm: async function() {
      let argins = _.clone(this.formData);
      await Cloud.uploadProfile.with({
        newProfile: argins.newProfile,
        teams: argins.teams,
        target: argins.target,
        labels: argins.labels,
        labelTargetBehavior: argins.labelTargetBehavior,
      });
      await this._getProfiles();
    },
    handleSubmittingEditProfileForm: async function() {
      let argins = _.clone(this.formData);
      if(argins.newTeamIds === [undefined]){
        argins.newTeamIds = [];
      }
      if(argins.target === 'custom'){
        await Cloud.editProfile.with({
          profile: argins.profile,
          newTeamIds: argins.newTeamIds,
          newProfile: argins.newProfile,
          labels: argins.labels,
          target: argins.target,
          labelTargetBehavior: argins.labelTargetBehavior,
        });
      } else {
        await Cloud.editProfile.with({
          profile: argins.profile,
          newTeamIds: argins.newTeamIds,
          newProfile: argins.newProfile
        });
      }
      await this._getProfiles();
    },
    _getProfiles: async function() {
      this.syncing = true;
      let newProfilesInformation = await Cloud.getProfiles();
      this.profiles = newProfilesInformation;
      this.syncing = false;
      await this.changeTeamFilter();
    },
    _getLabels: async function() {
      this.syncing = true;
      this.labelsSyncing = true;
      this.labels = await Cloud.getLabels().tolerate((err)=>{
        this.cloudError = err;
        this.syncing = false;
      });
      if(!this.cloudError){
        this.labelsSyncing = false;
        this.syncing = false;

      }
    }
  }
});
