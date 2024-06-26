export interface iDistribution {
  id: number
  name: string
  currentVersion: string
  releaseDate: string
  description: string
  officialWebsite: string
  baseDistro: string
  supportedArchitecture: string
  packageType: string
  desktopEnvironment?: string
  logoUrl: string
  desktopImageUrl: string
}
