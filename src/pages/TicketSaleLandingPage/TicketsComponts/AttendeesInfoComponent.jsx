import { useContext, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OrderSummaryComponents from '../OrderSummaryComponents/OrderSummaryComponents';
import { TicketsDataContext } from '../TicketSaleLandingPage';
import { useNavigate } from 'react-router-dom';
import { useDropin } from '../../../utils/DropinContext';

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const errorClass = "text-red-500 text-xs mt-1";

const TicketAttendeeBlock = ({ type, index, price }) => {
    const { register, watch, setValue, formState: { errors } } = useFormContext();
    const { fields, append } = useFieldArray({ name: 'attendees' });

    useEffect(() => {
        const sameTypeFields = fields.filter(f => f.ticketsType === type);
        if (sameTypeFields.length <= index) {
        append({
            ticketsType: type,
            price: price,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            organizationName: '',
            restrictions: '',
            requireVisa: 'NO',
            passportNumber: '',
            passportExpiry: '',
            countryOfPassport: ''
        });
        }
    }, [fields, append, index, type]);

    const attendees = watch('attendees') || [];
    const filtered = attendees
        .map((a, i) => ({ ...a, index: i }))
        .filter(a => a.ticketsType === type);

    if (!filtered[index]) return null;

    const attendeeIndex = filtered[index].index;
    const visaWatch = watch(`attendees.${attendeeIndex}.requireVisa`);

    return (
        <div key={attendeeIndex} className="border border-gray-300 rounded-lg p-4 mb-6">
            {/* Top Part of Ticket ___________________________________________________ */}
            <div className='flex justify-between items-center'>
                <h5 className='text-base font-semibold mb-3 capitalize'>Ticket - Attendee #{index + 1}</h5>
                {
                    type == 'Low and Middle Income Countries' &&
                    <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-[#fc5e5e]">{type}</span>
                }
                {
                    type == 'Full Conference Registration' &&
                    <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-[#fa6b92]">{type}</span>
                }
                {
                    type == 'Corporate' &&
                    <span className="text-xs font-light text-white font-semibold mb-3 capitalize px-4 py-1 rounded-md bg-[#19ca78]">{type}</span>
                }
            </div>
            {/* Input field Part ______________________________________________________  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <label className={labelClass}>First Name/Prénom <span className='text-red-500'>*</span></label>
                    <input {...register(`attendees.${attendeeIndex}.firstName`, { required: 'Required' })} className={inputClass} />
                    {errors.attendees?.[attendeeIndex]?.firstName && <p className={errorClass}>{errors.attendees[attendeeIndex].firstName.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Last Name/Nom <span className='text-red-500'>*</span></label>
                    <input {...register(`attendees.${attendeeIndex}.lastName`, { required: 'Required' })} className={inputClass} />
                    {errors.attendees?.[attendeeIndex]?.lastName && <p className={errorClass}>{errors.attendees[attendeeIndex].lastName.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Email <span className='text-red-500'>*</span></label>
                    <input type="email" {...register(`attendees.${attendeeIndex}.email`, { required: 'Required' })} className={inputClass} />
                    {errors.attendees?.[attendeeIndex]?.email && <p className={errorClass}>{errors.attendees[attendeeIndex].email.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Organization Name/Nom de l'organisation</label>
                    <input {...register(`attendees.${attendeeIndex}.organizationName`)} className={inputClass} />
                </div>
            </div>
            <div className="mt-3">
                <label className={labelClass}>Phone</label>
                <PhoneInput
                country={'us'}
                value={watch(`attendees.${attendeeIndex}.phone`)}
                onChange={(value) => setValue(`attendees.${attendeeIndex}.phone`, value)}
                />
            </div>
            <div className="mt-4">
                <label className={labelClass}>Do you require a visa letter of invitation?/Avez-vous besoin d'une lettre d'invitation pour un visa? <span className='text-red-500'>*</span></label>
                <select {...register(`attendees.${attendeeIndex}.requireVisa`, { required: 'Required' })} className={inputClass}>
                <option value="NO">No/Non</option>
                <option value="YES">Yes/Oui</option>
                </select>
            </div>
            {visaWatch === 'YES' && (
                <div className="grid grid-cols-1 gap-y-3 mt-4">
                <div>
                    <label className={labelClass}>Passport Number/Numéro de passeport <span className='text-red-500'>*</span></label>
                    <input {...register(`attendees.${attendeeIndex}.passportNumber`, { required: 'Required' })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Passport expiry date/Date d'expiration du passeport <span className='text-red-500'>*</span></label>
                    <input type="date" {...register(`attendees.${attendeeIndex}.passportExpiry`, { required: 'Required' })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Country of passport/Pays du passeport <span className='text-red-500'>*</span></label>
                    <input {...register(`attendees.${attendeeIndex}.countryOfPassport`, { required: 'Required' })} className={inputClass} />
                </div>
                </div>
            )}
            <div className="mt-4">
                <label className={labelClass}>Please indicate if you have any dietary restrictions/Veuillez indiquer si vous avez des restrictions alimentaires. <span className='text-red-500'>*</span></label>
                <input {...register(`attendees.${attendeeIndex}.restrictions`, { required: 'Required' })} className={inputClass} />
                {errors.attendees?.[attendeeIndex]?.restrictions && <p className={errorClass}>{errors.attendees[attendeeIndex].restrictions.message}</p>}
            </div>
        </div>
    );
};

const AttendeesInfoComponent = () => {
    const { 
        steps,setSteps,
        lowTicketsQuantity, 
        fullTicketsQuantity,
        corporateTicketsQuantity, 
        purcherAttendeesInfo, setPurcherAttendeesInfo,
        cuponCode, setCuponCode
    } = useContext(TicketsDataContext);

    const navigate = useNavigate();
    useEffect( () => {
        if(cuponCode)setCuponCode('')
        if(lowTicketsQuantity+fullTicketsQuantity+corporateTicketsQuantity ==0){navigate('/'); setSteps(1)}
    }, [])

    const lowTicketNumbers = Array.from({ length: lowTicketsQuantity }, (_, i) => i);
    const fullTicketNumbers = Array.from({ length: fullTicketsQuantity }, (_, i) => i);
    const corporateTicketNumbers = Array.from({ length: corporateTicketsQuantity }, (_, i) => i);

    // React Hook Form 
    const methods = useForm({
        defaultValues: purcherAttendeesInfo || {
        purcher: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        attendees: [],
        },
    });

    const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = methods;

    const onSubmit = (data) => {
        console.log(data)
        setSteps(3)
        setPurcherAttendeesInfo(data)
        navigate('/payments')
    };    


    const {  initializeBraintree } = useDropin();
    useEffect(() => {
        initializeBraintree();
    }, []);

    // const dataFromLoacalStorage = JSON.parse(localStorage.getItem('purcherAttendeesInfo'));
    // localStorage.setItem('purcherAttendeesInfo', JSON.stringify(data));

  

  return (
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='py-4 grid md:grid-cols-3 gap-4'>
                <div className='md:col-span-2'>
                    <div className="max-w-4xl mx-auto p-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Purcher Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <label className={labelClass}>First Name/Prénom <span className='text-red-500'>*</span></label>
                                    <input {...register('purcher.firstName', { required: 'Required' })} className={inputClass} />
                                    {errors.purcher?.firstName && <p className={errorClass}>{errors.purcher.firstName.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Last Name/Nom <span className='text-red-500'>*</span></label>
                                    <input {...register('purcher.lastName', { required: 'Required' })} className={inputClass} />
                                    {errors.purcher?.lastName && <p className={errorClass}>{errors.purcher.lastName.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Email <span className='text-red-500'>*</span></label>
                                    <input type="email" {...register('purcher.email', { required: 'Required' })} className={inputClass} />
                                    {errors.purcher?.email && <p className={errorClass}>{errors.purcher.email.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Phone</label>
                                    <PhoneInput
                                        country={'us'}
                                        value={watch('purcher.phone')}
                                        onChange={(value) => setValue('purcher.phone', value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Attendees</h2>
                            {lowTicketNumbers.map((i) => <TicketAttendeeBlock key={`low-${i}`} type="Low and Middle Income Countries" index={i} price={440}/>)}
                            {fullTicketNumbers.map((i) => <TicketAttendeeBlock key={`full-${i}`} type="Full Conference Registration" index={i} price={500}/>)}
                            {corporateTicketNumbers.map((i) => <TicketAttendeeBlock key={`corp-${i}`} type="Corporate" index={i} price={550}/>)}
                        </div>
                    {/* Pre submit button was here */}
                    </div>
                </div>
                <div className='relative cols'> {/* Add this wrapper */}
                    <div className='bg-slate-100 p-4 rounded-md sticky top-4 h-[fit-content]'>
                        <OrderSummaryComponents />
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
               <span
                    onClick={() => {
                        navigate('/'); 
                        setSteps(steps-1)
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
                >
                    Previous
                </span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Continue
                </button> 
            </div>
        </form>
    </FormProvider>
  );
};

export default AttendeesInfoComponent;


