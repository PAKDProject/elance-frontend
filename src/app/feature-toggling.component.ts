export class FeatureToggling {
  features: Object
  constructor() { 
    this.features = {
      UserDashboard: true,
      Messages: true,
      BrowseJobs: true,
      OrganizationDashboard: true,
      ProfileMenu: true
    }
  }

  check(name: string){
    if(this.features[name])
      return true
    return false
  }
}
