<?php

namespace App\Http\Controllers\API;

use App\Users;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
    public $successStatus = 200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
        return $request;
        /* $user = Auth::user(); 
        return response()->json(['success' => $user], $this-> successStatus);  */
     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $id = $request->input('user_id');
        $value = $request->input('first_name','last_name');
        User::where('user_id',id)->update([
            "first_name"=> $value,
            "last_name"=> $value,
        ]);
        return response()->json([
            'message' => 'successfully updated'
        ],201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,user $user)
    {
        $user = User::where('user_id',$request->input('user_id'));
        $user->delete();
        return "employee record successfully deleted" . $request->input('user_id');
    }
    public function signup(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'dob' => 'required',
            'mobile' => 'required',
            'login_mode_id' => 'required',
            'user_role_id' => 'required',
            'subscription_status' => 'required',
            'profile_picture' => 'required',
            'profile_cover' => 'required',
            // 'created_at' => 'required',
            // 'updated_at' => 'required',
        ]);
        $users = new Users([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'dob' => $request->dob,
            'mobile' => $request->mobile,
            'password' => bcrypt($request->password),
            'login_mode_id' => $request->login_mode_id,
            'user_role_id' => $request->user_role_id,
            'subscription_status' => $request->subscription_status,
            'profile_picture' => $request->profile_picture,
            'profile_cover' => $request->profile_cover,

        ]);
        $users->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

     /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'SUCCESS'=>'SUCCESS',
        ]);
    }
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
}


