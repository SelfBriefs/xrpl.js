import requests from '../../fixtures/requests'
import responses from '../../fixtures/responses'
import rippled from '../../fixtures/rippled'
import {assertResultMatch, TestSuite} from '../../utils'
const instructionsWithMaxLedgerVersionOffset = {maxLedgerVersionOffset: 100}

/**
 * Every test suite exports their tests in the default object.
 * - Check out the "TestSuite" type for documentation on the interface.
 * - Check out "test/client/index.ts" for more information about the test runner.
 */
export default <TestSuite>{
  'prepareCheckCash amount': async (client, address, mockRippled) => {
    mockRippled.addResponse({command: 'server_info'}, rippled.server_info.normal)
    const result = await client.prepareCheckCash(
      address,
      requests.prepareCheckCash.amount
    )
    assertResultMatch(result, responses.prepareCheckCash.amount, 'prepare')
  },

  'prepareCheckCash deliverMin': async (client, address, mockRippled) => {
    mockRippled.addResponse({command: 'server_info'}, rippled.server_info.normal)
    const result = await client.prepareCheckCash(
      address,
      requests.prepareCheckCash.deliverMin
    )
    assertResultMatch(result, responses.prepareCheckCash.deliverMin, 'prepare')
  },

  'with ticket': async (client, address, mockRippled) => {
    mockRippled.addResponse({command: 'server_info'}, rippled.server_info.normal)
    const localInstructions = {
      ...instructionsWithMaxLedgerVersionOffset,
      maxFee: '0.000012',
      ticketSequence: 23
    }
    const result = await client.prepareCheckCash(
      address,
      requests.prepareCheckCash.amount,
      localInstructions
    )
    assertResultMatch(result, responses.prepareCheckCash.ticket, 'prepare')
  }
}