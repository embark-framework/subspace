import Web3 from "web3";
import React from 'react';
import Subspace, { SubspaceOptions } from "@embarklabs/subspace"

export interface SubspaceProviderProps {
  web3: Web3;
  children: React.ReactNode;
  options: SubspaceOptions;
}

export const SubspaceProvider: React.Component<SubspaceProviderProps>;

export class observe extends React.Component<P> {}

export function useSubspace(): Subspace;

interface withSubspaceProps {
  subspace: Subspace;
}

export class withSubspace extends React.Component<P & withSubspace> {
  constructor(WrappedComponent: ReactNode);
}
