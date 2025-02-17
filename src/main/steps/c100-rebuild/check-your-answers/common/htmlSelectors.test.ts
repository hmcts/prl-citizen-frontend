import { HTML } from './htmlSelectors';

const LIST_ITEM = '<li>';
const LIST_ITEM_END = '</li>';
const UNORDER_LIST = '<ul class="govuk-list govuk-list--bullet">';
const UNORDER_LIST_END = '</ul>';
const H4 = '<h4>';
const H3 = '<h3>';
const P = '<p>';
const H4_CLOSE = '</h4>';
const H3_CLOSE = '</h3>';
const P_CLOSE = '</p>';
const RULER = '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">';
const BOTTOM_PADDING_3 = '<div class="govuk-!-padding-bottom-3">';
const BOTTOM_TOP_3 = '<div class="govuk-!-padding-top-3">';
const BREAK = '<br>';

test('htmlSelectorpositivetest', () => {
  expect(HTML.LIST_ITEM).toBe(LIST_ITEM),
    expect(HTML.LIST_ITEM_END).toBe(LIST_ITEM_END),
    expect(HTML.UNORDER_LIST).toBe(UNORDER_LIST),
    expect(HTML.UNORDER_LIST_END).toBe(UNORDER_LIST_END),
    expect(HTML.H4).toBe(H4),
    expect(HTML.H3).toBe(H3),
    expect(HTML.P).toBe(P),
    expect(HTML.H4_CLOSE).toBe(H4_CLOSE),
    expect(HTML.H3_CLOSE).toBe(H3_CLOSE),
    expect(HTML.P_CLOSE).toBe(P_CLOSE),
    expect(HTML.RULER).toBe(RULER),
    expect(HTML.BOTTOM_PADDING_3).toBe(BOTTOM_PADDING_3),
    expect(HTML.BOTTOM_TOP_3).toBe(BOTTOM_TOP_3),
    expect(HTML.BREAK).toBe(BREAK);
});
test('htmlSelectornegativetest', () => {
  expect(HTML.LIST_ITEM).not.toBe(LIST_ITEM_END),
    expect(HTML.LIST_ITEM_END).not.toBe(LIST_ITEM),
    expect(HTML.UNORDER_LIST).not.toBe(UNORDER_LIST_END),
    expect(HTML.UNORDER_LIST_END).not.toBe(UNORDER_LIST),
    expect(HTML.H4).not.toBe(H4_CLOSE),
    expect(HTML.H3).not.toBe(H3_CLOSE),
    expect(HTML.P).not.toBe(P_CLOSE),
    expect(HTML.H4_CLOSE).not.toBe(H4),
    expect(HTML.H3_CLOSE).not.toBe(H3),
    expect(HTML.P_CLOSE).not.toBe(P),
    expect(HTML.RULER).not.toBe(BREAK),
    expect(HTML.BOTTOM_PADDING_3).not.toBe(BOTTOM_TOP_3),
    expect(HTML.BOTTOM_TOP_3).not.toBe(BOTTOM_PADDING_3),
    expect(HTML.BREAK).not.toBe(RULER);
});
