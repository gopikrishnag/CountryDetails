import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetCountryDetailsAction } from 'src/app/country-details/store/actions/country-details.actions';
import AppState from 'src/models/app-state.model';
import { CountryDetails } from 'src/app/country-details/models/country-details.model';
import { Country } from 'src/app/country-details/models/country.model';
import { Region } from 'src/app/country-details/models/region.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html'
})
export class CountryDetailsComponent implements OnInit {
  selectedRegion: string;
  isEnabledSubmitButton: boolean = false;
  countryDetailForm: FormGroup;
  regions$: Observable<Region[]>;
  countryDetails$: Observable<CountryDetails[]>;
  countryDetails: CountryDetails[];
  selectedCountryDetails: CountryDetails[];
  hideSelectedCountryTable: boolean = true;
  hideCountryList: boolean = false;

  regions: Region[];
  error$: Observable<any>;
  countries: Country[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.listRegionFormGroup();
    this.getRegionsFromStore();
    this.isEnabledSubmitButton = false;
  }

  public listCounties() {
    this.getCountryDetailsFromStore();
    this.hideSelectedCountryTable = true;
  }


  private listRegionFormGroup() {
    this.countryDetailForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required])
    });
  }

  onCountryChanged(countryCode: string) {
    if (countryCode !== undefined) {
      this.selectedCountryDetails = this.countryDetails.filter(a => a.countryCode === countryCode);
      this.hideSelectedCountryTable = this.selectedCountryDetails?.length == 0;
    }
  }

  regionModified(regionName: string) {
    this.selectedRegion = regionName;
    this.isEnabledSubmitButton = regionName != undefined && regionName.length > 0;
    this.hideCountryList = this.selectedRegion !== undefined;
    this.hideSelectedCountryTable = true;
  }

  public getRegionsFromStore = () => {
    this.regions$ = this.store.select(store => store.region.regions);
    this.regions$.subscribe(res => {
      this.regions = res as Region[];
    }
    );
  }

  public getCountryDetailsFromStore = () => {
    this.countries = [];
    this.store.dispatch(new GetCountryDetailsAction(this.selectedRegion));
    this.countryDetails$ = this.store.select(store => store.countryDetails.countryDetails);
    this.countryDetails$.subscribe(res => {
      this.countryDetails = res as CountryDetails[];
      let countryList: Country[] = [];
      this.countryDetails.forEach((data) => {
        let country = new Country();
        country.code = data.countryCode;
        country.name = data.name;
        countryList.push(country);
      });

      this.countries = countryList;
    });
  }
}
