import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbout, YesOrNo } from "../../../app/case/definition";
import { SafetyConcerns, SafetyConcerns_child, SafetyConcerns_others, SafetyConcerns_yours } from "../allegations-of-harm-and-violence/check-your-answers/mainUtil";
import { cySaftyConcern, enSaftyConcern } from "./content";
import { CaseWithId } from "../../../app/case/case";
import { ANYTYPE } from "../proceedings/dateformatter";
import { SummaryList } from "@c100/check-your-answers/lib/lib";

export const safetyConcernHandler = (userCase: Partial<CaseWithId>):SummaryList | undefined =>{
let sectionss = [] as ANYTYPE
sectionss.push(SafetyConcerns(cySaftyConcern, userCase));

/** if user selects safty concerns as Yes then these section will display until line 352 */
if (userCase.hasOwnProperty('PRL_c1A_haveSafetyConcerns') && userCase['PRL_c1A_haveSafetyConcerns'] === YesOrNo.YES) {
  sectionss.push(SafetyConcerns_child(cySaftyConcern, userCase));
  if (toggleApplicantSafetyConcerns('PRL_c1A_safetyConernAbout', userCase, 'PRL_c1A_concernAboutChild')) {
    sectionss.push(SafetyConcerns_yours(cySaftyConcern, userCase));
    sectionss.push(SafetyConcerns_yours(enSaftyConcern, userCase));
  }
  sectionss.push(SafetyConcerns_others(cySaftyConcern, userCase));
  sectionss.push(SafetyConcerns_others(enSaftyConcern, userCase));
}
return sectionss
}

const toggleApplicantSafetyConcerns = (safteyConcernsAboutKey, userCase, childConcernsKey): boolean => {
    const safetyConcernIFOnlyChildAndwaitnessingSafetyConcernSelected =
      userCase.hasOwnProperty(safteyConcernsAboutKey) &&
      userCase[safteyConcernsAboutKey]?.length === 1 &&
      userCase[safteyConcernsAboutKey]?.some(concerner => concerner === PRL_C1ASafteyConcernsAbout.CHILDREN) &&
      userCase.hasOwnProperty(childConcernsKey) &&
      userCase[childConcernsKey]?.some(abuseType => abuseType === PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE);
    const checkIfYourSafetyConcernSelected = userCase[safteyConcernsAboutKey]?.some(
      concerner => concerner === PRL_C1ASafteyConcernsAbout.RESPONDENT
    );
    return !!(safetyConcernIFOnlyChildAndwaitnessingSafetyConcernSelected || checkIfYourSafetyConcernSelected);
  };
