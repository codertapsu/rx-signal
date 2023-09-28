import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  AppConfigurationClient,
  ConfigurationSetting,
  FeatureFlagValue,
  featureFlagPrefix,
  isFeatureFlag,
  parseFeatureFlag,
} from '@azure/app-configuration';
import {
  DefaultAzureCredential,
  InteractiveBrowserCredential,
} from '@azure/identity';

/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/
export function getEnvironmentVariable(name: string): string {
  const value =
    process.env[name.toUpperCase()] || process.env[name.toLowerCase()];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
  return value;
}

/**
 * typeguard - for timewindow client filter
 */
export function isTimeWindowClientFilter(
  clientFilter: any
): clientFilter is { parameters: { Start: string; End: string } } {
  return (
    clientFilter.name === 'Microsoft.TimeWindow' &&
    clientFilter.parameters &&
    clientFilter.parameters['Start'] &&
    clientFilter.parameters['End'] &&
    typeof clientFilter.parameters['Start'] === 'string' &&
    typeof clientFilter.parameters['End'] === 'string'
  );
}

const readOnlyConnectionString =
  'Endpoint=https://gioboa-app-config.azconfig.io;Id=bVBE;Secret=pJCiEg8N+I+vhwYEqYFhX8w5szHAJm6GDtGb2Kuq4aE=';

const writeableConnectionString =
  'Endpoint=https://gioboa-app-config.azconfig.io;Id=dHx0;Secret=QYMhTEUqTaHuCfg4x9dVwzP3eAcLpdjREaZEkqNaRGU=';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _configurationReader!: AppConfigurationClient;
  private _configurationWriter!: AppConfigurationClient;

  public readonly flagForm = new FormGroup({
    name: new FormControl(''),
    key: new FormControl('', [Validators.required]),
    label: new FormControl(''),
    description: new FormControl(''),
    enable: new FormControl(true),
  });
  public flags = new Array<ConfigurationSetting<FeatureFlagValue>>();

  public ngOnInit(): void {
    this._configurationReader = new AppConfigurationClient(
      readOnlyConnectionString
    );
    this._configurationWriter = new AppConfigurationClient(
      writeableConnectionString
    );

    // this.getFeatureFlags(['snippets']);
  }

  public checked(): boolean {
    console.log('AppComponent checked');
    return true;
  }

  public async getFlags() {
    this.flags.length = 0;
    const result = this._configurationReader.listConfigurationSettings();
    for await (const item of result) {
      const flag = parseFeatureFlag(item);
      this.flags.push(flag);
    }
    this._changeDetectorRef.markForCheck();
  }

  public createFlag(): void {
    if (this.flagForm.valid) {
      const { name, label, key, description, enable } =
        this.flagForm.getRawValue() as {
          name: string;
          key: string;
          label: string;
          description: string;
          enable: boolean;
        };
      this._configurationWriter
        .addConfigurationSetting({
          key: featureFlagPrefix + key,
          label: label || key,
          contentType:
            'application/vnd.microsoft.appconfig.ff+json;charset=utf-8',
          value: {
            displayName: name || key,
            enabled: enable,
            description: description || key,
            conditions: {
              clientFilters: [],
            },
          },
        })
        .then((res) => {
          console.log({ res });
          this.getFlags();
          this.flagForm.reset();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  private async getFeatureFlags(keys: string[]): Promise<void> {
    const [setting1, setting2] = await Promise.all(
      keys.map((key) =>
        this._configurationReader.getConfigurationSetting(
          {
            key: featureFlagPrefix + key,
            label: key,
          },
          { requestOptions: { customHeaders: { 'cache-control': 'no-cache' } } }
        )
      )
    );
    console.log(setting2);

    if (isFeatureFlag(setting1)) {
      const parsedFeatureFlag1 = parseFeatureFlag(setting1);
      console.log({ parsedFeatureFlag1 });

      // const clientFilter = parsedFeatureFlag1.value.conditions.clientFilters?.[0];
      // if (isTimeWindowClientFilter(clientFilter)) {
      //   const now = Date.now();
      //   const withinRange =
      //     now - Date.parse(clientFilter.parameters.Start) > 0 &&
      //     Date.parse(clientFilter.parameters.End) - now > 0;
      //     console.log(clientFilter.parameters);

      //   // setFeature2({ enabled: withinRange });
      // } else {
      //   // setFeature2({ enabled: false });
      // }

      // console.log(`${parsedFeatureFlag1.key} is enabled : ${parsedFeatureFlag1.enabled}`, parsedFeatureFlag1);
      // setFeature1({ enabled: parsedFeatureFlag1.value.enabled });
    }
    if (isFeatureFlag(setting2)) {
      const parsedFeatureFlag2 = parseFeatureFlag(setting2);
      console.log({ parsedFeatureFlag2 });
      // console.log(`${parsedFeatureFlag2.key} is enabled : ${parsedFeatureFlag2.value.enabled}`, parsedFeatureFlag2);
      const clientFilter =
        parsedFeatureFlag2.value.conditions.clientFilters?.[0];
      // if (isTimeWindowClientFilter(clientFilter)) {
      //   const now = Date.now();
      //   const withinRange =
      //     now - Date.parse(clientFilter.parameters.Start) > 0 &&
      //     Date.parse(clientFilter.parameters.End) - now > 0;
      //   setFeature2({ enabled: withinRange });
      // } else {
      //   setFeature2({ enabled: false });
      // }
    }
  }
}
